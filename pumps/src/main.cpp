#include <ArduinoJson.h>
#include <AsyncDelay.h>
#include <Arduino.h>

#define MAIN 13
#define FLORA 6
#define GROW 5
#define BLOOM 4
#define PHUP 3

int floraSleep = 0;
int bloomSleep = 0;
int growSleep = 0;
int phSleep = 0;
int mainSleep = 0;
int mainPump = 0;

char cmd[70];

AsyncDelay mainTimer;
AsyncDelay floraTimer;
AsyncDelay bloomTimer;
AsyncDelay growTimer;
AsyncDelay phTimer;

void setup() {
  pinMode(MAIN, OUTPUT);
  pinMode(FLORA, OUTPUT);
  pinMode(GROW, OUTPUT);
  pinMode(BLOOM, OUTPUT);
  pinMode(PHUP, OUTPUT);

  digitalWrite(MAIN, HIGH);
  digitalWrite(FLORA, HIGH);
  digitalWrite(BLOOM, HIGH);
  digitalWrite(GROW, HIGH);
  digitalWrite(PHUP, HIGH);

  Serial.begin(9600);
}

void loop() {

  if(Serial.available() > 0) {
    Serial.readBytes(cmd, 70);

    DynamicJsonDocument root(200);
    DeserializationError error = deserializeJson(root, cmd);

    // Test if parsing succeeds.
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.c_str());
      return;
    }

    Serial.flush();

    floraSleep = root["FLORA"]; 
    bloomSleep = root["BLOOM"];
    growSleep = root["GROW"];
    phSleep = root["PH"];
    mainPump = root["MAIN"];

    if (mainPump != 0) { 
      mainSleep = mainPump;
    }

    Serial.println("DATA:");
    Serial.println(floraSleep);
    Serial.println(bloomSleep);
    Serial.println(growSleep);
    Serial.println(phSleep);
    Serial.println(mainPump);

    memset(cmd, 0, sizeof(cmd));

    if(mainSleep > 0) mainTimer.start(mainSleep, AsyncDelay::MILLIS);
    if(floraSleep > 0) floraTimer.start(floraSleep, AsyncDelay::MILLIS);
    if(bloomSleep > 0) bloomTimer.start(bloomSleep, AsyncDelay::MILLIS);
    if(growSleep > 0) growTimer.start(growSleep, AsyncDelay::MILLIS);
    if(phSleep > 0) phTimer.start(phSleep, AsyncDelay::MILLIS);
  }

  //Main
  if (mainSleep == -1)
  {
    digitalWrite(MAIN, LOW);
    mainSleep = -2;
  }
  
  if (mainSleep > 0) {
    digitalWrite(MAIN, LOW);
    if (mainTimer.isExpired()) {
      digitalWrite(MAIN, HIGH);
      mainSleep = 0;
      Serial.println("OK");
    }
  }

  //Flora
  if (floraSleep != 0) {
    digitalWrite(FLORA, LOW);
    
    if (floraTimer.isExpired()) {
      digitalWrite(FLORA, HIGH);
      floraSleep = 0;
      Serial.println("OK");
    }
  }


  //Bloom
  if (bloomSleep != 0) {
    digitalWrite(BLOOM, LOW);
  
    if (bloomTimer.isExpired()) {
      digitalWrite(BLOOM, HIGH);
      bloomSleep = 0;
      Serial.println("OK");
    }
  }


  //Grow
  if (growSleep != 0) {
    digitalWrite(GROW, LOW);

    if (growTimer.isExpired()) {
      digitalWrite(GROW, HIGH);
      growSleep = 0;
      Serial.println("OK");
    }
  }


  //PH
  if (phSleep != 0) {
    digitalWrite(PHUP, LOW);

    if (phTimer.isExpired()) {
      digitalWrite(PHUP, HIGH);
      phSleep = 0;
      Serial.println("OK");
    }
  }

}

