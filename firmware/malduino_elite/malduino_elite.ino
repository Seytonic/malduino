#include <SPI.h>
#include <SD.h>
#include "Keyboard.h"

//#define debug true // <-- uncomment to turn serial output on
#define CSpin 4 //Chip-Select of the SD-Card reader

//Dip-Switch Pins:
#define dip1 6
#define dip2 7
#define dip3 8
#define dip4 9

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
char last[buffersize];
int lastSize = 0;
char buf[buffersize];
int bufSize = 0;
int defaultDelay = 5;
int defaultCharDelay = 5;

int getSpace(int start, int end){
  for(int i=start;i<end;i++){
    if(buf[i] == ' ') return i;
  }
  return -1;
}

bool equals(int start, int end, char* str){
  int len = sizeof(str);
  if(end-start != len) return false;
  for(int i=0;i<len;i++){
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
    if(equals(0,space,"DEFAULTDELAY") || equals(0,space,"DEFAULT_DELAY")) defaultDelay = getInt(space);
    else if(equals(0,space,"DEFAULTCHARDELAY") || equals(0,space,"DEFAULT_CHAR_DELAY")) defaultCharDelay = getInt(space);
    else if(equals(0,space,"DELAY")) delay(getInt(space));
    else if(equals(0,space,"STRING")){
      for(int i=space+1;i<bufSize;i++) KeyboardWrite(buf[i]);
    }else if(equals(0,space,"REPEAT") || equals(0,space,"REPLAY")){
      int runs = getInt(space);
      strncpy(buf, last, lastSize);
      bufSize = lastSize;
      for(int i=0;i<runs;i++){
        runLine();
      }
    }
    else if(equals(0,space,"REM")){}
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
  
  if(s == e) Keyboard.press(buf[s]);
  else if(equals(s,e,"ENTER")) Keyboard.press(KEY_RETURN);
  else if(equals(s,e,"GUI") || equals(s,e,"WINDOWS")) Keyboard.press(KEY_LEFT_GUI);
  else if(equals(s,e,"SHIFT")) Keyboard.press(KEY_LEFT_SHIFT);
  else if(equals(s,e,"ALT")) Keyboard.press(KEY_LEFT_ALT);
  else if(equals(s,e,"CTRL") || equals(s,e,"CONTROL")) Keyboard.press(KEY_LEFT_CTRL);
  else if(equals(s,e,"CAPSLOCK")) Keyboard.press(KEY_CAPS_LOCK);
  else if(equals(s,e,"DELETE")) Keyboard.press(KEY_DELETE);
  else if(equals(s,e,"END")) Keyboard.press(KEY_END);
  else if(equals(s,e,"ESC") || equals(s,e,"ESCAPE")) Keyboard.press(KEY_ESC);
  else if(equals(s,e,"HOME")) Keyboard.press(KEY_HOME);
  else if(equals(s,e,"INSERT")) Keyboard.press(KEY_INSERT);
  else if(equals(s,e,"PAGEUP")) Keyboard.press(KEY_PAGE_UP);
  else if(equals(s,e,"PAGEDOWN")) Keyboard.press(KEY_PAGE_DOWN);
  else if(equals(s,e,"SPACE")) Keyboard.press(' ');
  else if(equals(s,e,"TAB")) Keyboard.press(KEY_TAB);
  else if(equals(s,e,"UP")) Keyboard.press(KEY_UP_ARROW);
  else if(equals(s,e,"DOWN")) Keyboard.press(KEY_DOWN_ARROW);
  else if(equals(s,e,"LEFT")) Keyboard.press(KEY_LEFT_ARROW);
  else if(equals(s,e,"RIGHT")) Keyboard.press(KEY_RIGHT_ARROW);
  else if(equals(s,e,"PRINTSCREEN")) Keyboard.press(PRINTSCREEN);

  else if(equals(s,e,"F1")) Keyboard.press(KEY_F1);
  else if(equals(s,e,"F2")) Keyboard.press(KEY_F2);
  else if(equals(s,e,"F3")) Keyboard.press(KEY_F3);
  else if(equals(s,e,"F4")) Keyboard.press(KEY_F4);
  else if(equals(s,e,"F5")) Keyboard.press(KEY_F5);
  else if(equals(s,e,"F6")) Keyboard.press(KEY_F6);
  else if(equals(s,e,"F7")) Keyboard.press(KEY_F7);
  else if(equals(s,e,"F8")) Keyboard.press(KEY_F8);
  else if(equals(s,e,"F9")) Keyboard.press(KEY_F9);
  else if(equals(s,e,"F10")) Keyboard.press(KEY_F10);
  else if(equals(s,e,"F11")) Keyboard.press(KEY_F11);
  else if(equals(s,e,"F12")) Keyboard.press(KEY_F12);

  else if(equals(s,e,"NUM_0")) KeyboardWrite(KEYPAD_0);
  else if(equals(s,e,"NUM_1")) KeyboardWrite(KEYPAD_1);
  else if(equals(s,e,"NUM_2")) KeyboardWrite(KEYPAD_2);
  else if(equals(s,e,"NUM_3")) KeyboardWrite(KEYPAD_3);
  else if(equals(s,e,"NUM_4")) KeyboardWrite(KEYPAD_4);
  else if(equals(s,e,"NUM_5")) KeyboardWrite(KEYPAD_5);
  else if(equals(s,e,"NUM_6")) KeyboardWrite(KEYPAD_6);
  else if(equals(s,e,"NUM_7")) KeyboardWrite(KEYPAD_7);
  else if(equals(s,e,"NUM_8")) KeyboardWrite(KEYPAD_8);
  else if(equals(s,e,"NUM_9")) KeyboardWrite(KEYPAD_9);
  /*
  else if(equals(s,e,"NUM_ASTERIX")) KeyboardWrite(KEYPAD_ASTERIX);
  else if(equals(s,e,"NUM_ENTER")) KeyboardWrite(KEYPAD_ENTER);
  else if(equals(s,e,"NUM_Minus")) KeyboardWrite(KEYPAD_MINUS);
  else if(equals(s,e,"NUM_PERIOD")) KeyboardWrite(KEYPAD_PERIOD);
  else if(equals(s,e,"NUM_PLUS")) KeyboardWrite(KEYPAD_PLUS);
  else if(equals(s,e,"NUM_SLASH")) KeyboardWrite(KEYPAD_SLASH);*/
  
  //not implemented
  //else if(equals(s,e,"APP")) Keyboard.press();
  //else if(equals(s,e,"MENU")) Keyboard.press();
  //else if(equals(s,e,"BREAK") || equals(s,e,"PAUSE")) Keyboard.press();
  //else if(equals(s,e,"NUMLOCK")) Keyboard.press();
  //else if(equals(s,e,"SCROLLLOCK")) Keyboard.press();
}

void setup() {
  #ifdef debug
    Serial.begin(115200);
    delay(2000);
    Serial.println("Started!");
  #endif
  
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

}
