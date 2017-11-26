#include <ArduinoJson.h>

#define MAIN 6
#define FLORA 5
#define GROW 4
#define BLOOM 3
#define PHUP 2

char cmd[50];

void setup() {
  pinMode(MAIN, OUTPUT);
  pinMode(FLORA, OUTPUT);
  pinMode(GROW, OUTPUT);
  pinMode(BLOOM, OUTPUT);
  pinMode(PHUP, OUTPUT);

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
      digitalWrite(MAIN, HIGH);
      if(sleep != 0) {
        delay(sleep);
        digitalWrite(MAIN, LOW);
      }
      Serial.println("OK");
    }
    if(pump == "FLORA") {
      digitalWrite(FLORA, HIGH);
      delay(sleep);
      digitalWrite(FLORA, LOW);
      Serial.println("OK");
    }
    if(pump == "BLOOM") {
      digitalWrite(BLOOM, HIGH);
      delay(sleep);
      digitalWrite(BLOOM, LOW);
      Serial.println("OK");
    }
    if(pump == "GROW") {
      digitalWrite(GROW, HIGH);
      delay(sleep);
      digitalWrite(GROW, LOW);
      Serial.println("OK");
    }
    if(pump == "PHUP") {
      digitalWrite(PHUP, HIGH);
      delay(sleep);
      digitalWrite(PHUP, LOW);
      Serial.println("OK");
    }
  }
}

