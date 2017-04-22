/*
Copyright (c) 2017 Seytonic, Spacehuhn (Licensed unter MIT)
For more information see: github.com/seytonic/malduino
*/

#include "Keyboard.h"

#define blinkInterval 50
#define ledPin 3
#define buttonPin 6

int defaultDelay = 4;
int defaultCharDelay = 5;
bool ledOn = true;

void typeKey(int key){
  Keyboard.press(key);
  delay(defaultCharDelay);
  Keyboard.release(key);
}

void setup(){
  
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);

  digitalWrite(ledPin, HIGH);
  
  if(digitalRead(buttonPin) == LOW){
    /* ----- Script-Begin (just a little Hello World example here) ----- */
    Keyboard.begin();
    
    delay(1000);
  
    delay(defaultDelay);
    Keyboard.print("Hello World!");
  
    delay(defaultDelay);
    /* ----- Script-End ----- */
    Keyboard.end();
  }
}

void loop() {
  ledOn = !ledOn;
  digitalWrite(ledPin, ledOn);
  delay(blinkInterval);
}
