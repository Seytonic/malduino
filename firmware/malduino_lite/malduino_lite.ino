#include "Keyboard.h"

#define buttonPin 6
int defaultDelay = 4;
int defaultCharDelay = 5;

void typeKey(int key){
  Keyboard.press(key);
  delay(defaultCharDelay);
  Keyboard.release(key);
}

void setup(){
  
  pinMode(buttonPin, INPUT_PULLUP);
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

void loop() {}
