#include <ArduinoJson.h>
#include <Arduino.h>

#define MAIN 13
#define FLORA 6
#define GROW 5
#define BLOOM 4
#define PHUP 3

int floraSleep;
int bloomSleep;
int growSleep;
int phSleep;
int mainSleep;

char cmd[70];

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

    floraSleep = 0;
    bloomSleep = 0;
    growSleep = 0;
    phSleep = 0;
    mainSleep = 0;

    Serial.flush();

    StaticJsonBuffer<70> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(cmd);
    floraSleep = root["FLORA"];
    bloomSleep = root["BLOOM"];
    growSleep = root["GROW"];
    phSleep = root["PH"];
    mainSleep = root["MAIN"];
    memset(cmd, 0, sizeof(cmd));


      //Main
      digitalWrite(MAIN, LOW);
      if (mainSleep != 0) {
        delay(mainSleep);
        digitalWrite(MAIN, HIGH);
      }
      delay(1000);
      Serial.println("OK");

      //Flora
      if (floraSleep != 0) {
        digitalWrite(FLORA, LOW);
        delay(floraSleep);
        digitalWrite(FLORA, HIGH);
        delay(1000);
        Serial.println("OK");
      }

      //Bloom
      if (bloomSleep != 0) {
        digitalWrite(BLOOM, LOW);
        delay(bloomSleep);
        digitalWrite(BLOOM, HIGH);
        delay(1000);
        Serial.println("OK");
      }

      //Grow
      if (growSleep != 0) {
        digitalWrite(GROW, LOW);
        delay(growSleep);
        digitalWrite(GROW, HIGH);
        delay(1000);
        Serial.println("OK");
      }

      //PH
      if (phSleep != 0) {
        digitalWrite(PHUP, LOW);
        delay(phSleep);
        digitalWrite(PHUP, HIGH);
        delay(1000);
        Serial.println("OK");
      }

  }
}

