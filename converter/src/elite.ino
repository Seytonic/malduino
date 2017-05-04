/*
Copyright (c) 2017 Seytonic, Spacehuhn (Licensed under MIT)
For more information see: github.com/seytonic/malduino
*/

#include <SPI.h>
#include <SD.h>
#include "Keyboard.h"

//#define debug true // <-- uncomment to turn serial output on
#define CSpin 4 //Chip-Select of the SD-Card reader
#define ledPin 3
#define blinkInterval 50

//Dip-Switch Pins:
#define dip1 6
#define dip2 8
#define dip3 9
#define dip4 10

#define buffersize 256

#define KEYPAD_0 234
#define KEYPAD_1 225
#define KEYPAD_2 226
#define KEYPAD_3 227
#define KEYPAD_4 228
#define KEYPAD_5 229
#define KEYPAD_6 230
#define KEYPAD_7 231
#define KEYPAD_8 232
#define KEYPAD_9 233
#define KEYPAD_ASTERIX 221
#define KEYPAD_ENTER 224
#define KEYPAD_MINUS 222
#define KEYPAD_PERIOD 235
#define KEYPAD_PLUS 223
#define KEYPAD_SLASH 220
#define PRINTSCREEN 206 

File payload;
char* last = malloc(sizeof(char)*buffersize);
int lastSize = 0;
char* buf = malloc(sizeof(char)*buffersize);
int bufSize = 0;
int defaultDelay = 5;
int defaultCharDelay = 5;
bool ledOn = true;

int getSpace(int start, int end){
  for(int i=start;i<end;i++){
    if(buf[i] == ' ') return i;
  }
  return -1;
}

bool equals(int start, int end, char* str, int strLen){
  if(end-start != strLen) return false;
  for(int i=0;i<strLen;i++){
    if(buf[start+i] != str[i]) return false;
  }
  return true;
}

int getInt(int pos){
  String amount = String(buf).substring(pos+1,pos+6);
  return amount.toInt();
}

void KeyboardWrite(uint8_t c){  
  Keyboard.press(c);
  delay(defaultCharDelay);
  Keyboard.release(c);
}

void runLine(){
  #ifdef debug 
    Serial.println("run: '"+String(buf).substring(0,bufSize)+"' ("+(String)bufSize+")");
  #endif

  int space = getSpace(0,bufSize);

  if(space == -1) runCommand(0,bufSize);
  else{
    if(equals(0,space,"DEFAULTDELAY",12) || equals(0,space,"DEFAULT_DELAY",13)) defaultDelay = getInt(space);
    else if(equals(0,space,"DEFAULTCHARDELAY",16) || equals(0,space,"DEFAULT_CHAR_DELAY",18)) defaultCharDelay = getInt(space);
    else if(equals(0,space,"DELAY",5)) delay(getInt(space));
    else if(equals(0,space,"STRING",6)){
      for(int i=space+1;i<bufSize;i++) KeyboardWrite(buf[i]);
    }else if(equals(0,space,"REPEAT",6)){
      int runs = getInt(space);
      strncpy(buf, last, lastSize);
      bufSize = lastSize;
      for(int i=0;i<runs;i++){
        runLine();
      }
    }
    else if(equals(0,space,"REM",3)){}
    else{
      runCommand(0,space);
      while(space >= 0 && space < bufSize){
        int nSpace = getSpace(space+1,bufSize);
        if(nSpace == -1) nSpace = bufSize;
        runCommand(space+1,nSpace);
        space = nSpace;
      }
    }
  }

  Keyboard.releaseAll();
  delay(defaultDelay);
}

void runCommand(int s, int e){

  #ifdef debug 
    Serial.println("Press '"+String(buf).substring(s,e)+"'");
  #endif
  
  if(e - s < 2) Keyboard.press(buf[s]);
  else if(equals(s,e,"ENTER",5)) Keyboard.press(KEY_RETURN);
  else if(equals(s,e,"GUI",3) || equals(s,e,"WINDOWS",5)) Keyboard.press(KEY_LEFT_GUI);
  else if(equals(s,e,"SHIFT",5)) Keyboard.press(KEY_LEFT_SHIFT);
  else if(equals(s,e,"ALT",3)) Keyboard.press(KEY_LEFT_ALT);
  else if(equals(s,e,"CTRL",4) || equals(s,e,"CONTROL",7)) Keyboard.press(KEY_LEFT_CTRL);
  else if(equals(s,e,"CAPSLOCK",8)) Keyboard.press(KEY_CAPS_LOCK);
  else if(equals(s,e,"DELETE",6)) Keyboard.press(KEY_DELETE);
  else if(equals(s,e,"END",3)) Keyboard.press(KEY_END);
  else if(equals(s,e,"ESC",3) || equals(s,e,"ESCAPE",6)) Keyboard.press(KEY_ESC);
  else if(equals(s,e,"HOME",4)) Keyboard.press(KEY_HOME);
  else if(equals(s,e,"INSERT",6)) Keyboard.press(KEY_INSERT);
  else if(equals(s,e,"PAGEUP",6)) Keyboard.press(KEY_PAGE_UP);
  else if(equals(s,e,"PAGEDOWN",8)) Keyboard.press(KEY_PAGE_DOWN);
  else if(equals(s,e,"SPACE",5)) Keyboard.press(' ');
  else if(equals(s,e,"TAB",3)) Keyboard.press(KEY_TAB);
  
  else if(equals(s,e,"UP",2) || equals(s,e,"UPARROW",7)) Keyboard.press(KEY_UP_ARROW);
  else if(equals(s,e,"DOWN",4) || equals(s,e,"DOWNARROW",9)) Keyboard.press(KEY_DOWN_ARROW);
  else if(equals(s,e,"LEFT",4) || equals(s,e,"LEFTARROW",9)) Keyboard.press(KEY_LEFT_ARROW);
  else if(equals(s,e,"RIGHT",5) || equals(s,e,"RIGHTARROW",10)) Keyboard.press(KEY_RIGHT_ARROW);
  
  else if(equals(s,e,"PRINTSCREEN",11)) Keyboard.press(PRINTSCREEN);

  else if(equals(s,e,"F1",3)) Keyboard.press(KEY_F1);
  else if(equals(s,e,"F2",3)) Keyboard.press(KEY_F2);
  else if(equals(s,e,"F3",3)) Keyboard.press(KEY_F3);
  else if(equals(s,e,"F4",3)) Keyboard.press(KEY_F4);
  else if(equals(s,e,"F5",3)) Keyboard.press(KEY_F5);
  else if(equals(s,e,"F6",3)) Keyboard.press(KEY_F6);
  else if(equals(s,e,"F7",3)) Keyboard.press(KEY_F7);
  else if(equals(s,e,"F8",3)) Keyboard.press(KEY_F8);
  else if(equals(s,e,"F9",3)) Keyboard.press(KEY_F9);
  else if(equals(s,e,"F10",3)) Keyboard.press(KEY_F10);
  else if(equals(s,e,"F11",3)) Keyboard.press(KEY_F11);
  else if(equals(s,e,"F12",3)) Keyboard.press(KEY_F12);

  else if(equals(s,e,"NUM_0",5)) KeyboardWrite(KEYPAD_0);
  else if(equals(s,e,"NUM_1",5)) KeyboardWrite(KEYPAD_1);
  else if(equals(s,e,"NUM_2",5)) KeyboardWrite(KEYPAD_2);
  else if(equals(s,e,"NUM_3",5)) KeyboardWrite(KEYPAD_3);
  else if(equals(s,e,"NUM_4",5)) KeyboardWrite(KEYPAD_4);
  else if(equals(s,e,"NUM_5",5)) KeyboardWrite(KEYPAD_5);
  else if(equals(s,e,"NUM_6",5)) KeyboardWrite(KEYPAD_6);
  else if(equals(s,e,"NUM_7",5)) KeyboardWrite(KEYPAD_7);
  else if(equals(s,e,"NUM_8",5)) KeyboardWrite(KEYPAD_8);
  else if(equals(s,e,"NUM_9",5)) KeyboardWrite(KEYPAD_9);
  else if(equals(s,e,"NUM_ASTERIX",11)) KeyboardWrite(KEYPAD_ASTERIX);
  else if(equals(s,e,"NUM_ENTER",9)) KeyboardWrite(KEYPAD_ENTER);
  else if(equals(s,e,"NUM_Minus",9)) KeyboardWrite(KEYPAD_MINUS);
  else if(equals(s,e,"NUM_PERIOD",10)) KeyboardWrite(KEYPAD_PERIOD);
  else if(equals(s,e,"NUM_PLUS",8)) KeyboardWrite(KEYPAD_PLUS);

  #ifdef debug 
      else Serial.println("failed");
  #endif
  
  /* not implemented
  else if(equals(s,e,"APP",3)) Keyboard.press();
  else if(equals(s,e,"MENU",4)) Keyboard.press();
  else if(equals(s,e,"BREAK",5) || equals(s,e,"PAUSE",5)) Keyboard.press();
  else if(equals(s,e,"NUMLOCK",7)) Keyboard.press();
  else if(equals(s,e,"SCROLLLOCK",10)) Keyboard.press();
  */
}

void setup() {
  #ifdef debug
    Serial.begin(115200);
    delay(2000);
    Serial.println("Started!");
  #endif

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
  
  String scriptName = ""; // Name of the file that will be opened

  pinMode(dip1, INPUT_PULLUP);
  pinMode(dip2, INPUT_PULLUP);
  pinMode(dip3, INPUT_PULLUP);
  pinMode(dip4, INPUT_PULLUP);
  
  if(digitalRead(dip1) == LOW){scriptName += '1';} else {scriptName += '0';}
  if(digitalRead(dip2) == LOW){scriptName += '1';} else {scriptName += '0';}
  if(digitalRead(dip3) == LOW){scriptName += '1';} else {scriptName += '0';}
  if(digitalRead(dip4) == LOW){scriptName += '1';} else {scriptName += '0';}

  scriptName += ".txt";

  if(!SD.begin(4)) {
    #ifdef debug 
      Serial.println("couldn't access sd-card :(");
    #endif
    return;
  }

  payload = SD.open(scriptName);
  if(!payload){
    #ifdef debug 
      Serial.println("couldn't find script: '"+String(scriptName)+"'");
    #endif
    return;
  }else{
    Keyboard.begin();
    while(payload.available()){

      buf[bufSize] = payload.read();
      if(buf[bufSize] == '\r' || buf[bufSize] == '\n' || bufSize >= buffersize){
        if(buf[bufSize] == '\r' && payload.peek() == '\n') payload.read();
        runLine();
        strncpy(last, buf, bufSize);
        lastSize = bufSize;
        bufSize = 0;
      }
      else bufSize++;
    }
    if(bufSize > 0){
      runLine();
      strncpy(last, buf, bufSize);
      lastSize = bufSize;
      bufSize = 0;
    }
    payload.close();
    Keyboard.end();
  }
}

void loop() {
  ledOn = !ledOn;
  digitalWrite(ledPin, ledOn);
  delay(blinkInterval);
}
