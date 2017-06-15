# MalDuino

In `firmware` is the current source code for both MalDuino lite and elite.  

In `converter` you find the source code for the MalDuino Script Converter: https://malduino.com/converter/  

**If you find bugs in the converter or with the MalDuino code, please let us know.**

## Ducky Script Command List

|			Command			|			Description				|
| ------------------------- | --------------------------------- |
| REM						| Comment							|
| DEFAULTDELAY				| Time in ms between every command 	|
| DEFAULTCHARDELAY			| Time in ms between every character|
| DELAY						| Delay in ms 						|
| RANDOM					| Returns a random int				|
| RANDOMMIN					| Set min random value (default 0)  |
| RANDOMMAX					| Set max random value (default 100)|
| STRING					| Types the following string 		|
| REPLAY					| Repeats the last command n times	|
| GUI						| Windows or CMD key				|

|		Modifier Keys		|
| ------------------------- |
| GUI						|
| SHIFT						|
| ALT_LEFT					|
| ALT_RIGHT					|
| CAPSLOCK					|

|			Keys			|
| ------------------------- |
| a - z						|
| A - Z						|
| 0 - 9						|
| F1 - F12					|
| ENTER						|
| DELETE					|
| BACKSPACE					|
| ESC						|
| INSERT					|
| SPACE						|
| TAB						|
| DOWN						|
| LEFT						|
| RIGHT						|
| UP 						|
| HOME						|
| APP						|
| MENU						|
| PAGEUP					|
| PAGEDOWN					|
| KEYPAD_0 - KEYPAD_9		|
| KEYPAD_ASTERIX			|
| KEYPAD_ENTER				|
| KEYPAD_MINUS				|
| KEYPAD_PERIOD				|
| KEYPAD_PLUS				|
| KEYPAD_SLASH				|
| PRINTSCREEN				|

|		Mouse Commands		|
| ------------------------- |
| MOUSE X Y					|
| SCROLL Y					|
| CLICK_LEFT				|
| CLICK_RIGHT				|
| CLICK_MIDDLE				|
| PRESS_LEFT				|
| PRESS_RIGHT				|
| PRESS_MIDDLE				|
| RELEASE_LEFT				|
| RELEASE_RIGHT				|
| RELEASE_MIDDLE			|

Based on Hak5's work: [Ducky Script](https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Duckyscript)