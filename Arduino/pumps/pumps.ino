#include <ArduinoJson.h>

#define MAIN 13  
#define FLORA 6
#define GROW 5
#define BLOOM 4
#define PHUP 3

char cmd[50];

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
    Serial.readBytes(cmd, 50);
        
    StaticJsonBuffer<50> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(cmd);
    String pump = root["pump"];
    int sleep = root["sleep"];

    if(pump == "MAIN") {
      digitalWrite(MAIN, LOW);
      if(sleep != 0) {
        delay(sleep);
        digitalWrite(MAIN, HIGH);
      }
      Serial.println("OK");
    }
    if(pump == "FLORA") {
      digitalWrite(FLORA, LOW);
      delay(sleep);
      digitalWrite(FLORA, HIGH);
      Serial.println("OK");
    }
    if(pump == "BLOOM") {
      digitalWrite(BLOOM, LOW);
      delay(sleep);
      digitalWrite(BLOOM, HIGH);
      Serial.println("OK");
    }
    if(pump == "GROW") {
      digitalWrite(GROW, LOW);
      delay(sleep);
      digitalWrite(GROW, HIGH);
      Serial.println("OK");
    }
    if(pump == "PHUP") {
      digitalWrite(PHUP, LOW);
      delay(sleep);
      digitalWrite(PHUP, HIGH);
      Serial.println("OK");
    }
  }
}

