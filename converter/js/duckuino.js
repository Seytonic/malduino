var commandMap = {
  ESCAPE:'KEY_ESC',
  MENU:'229',
  ESC:'KEY_LEFT_ESC',
  END:'KEY_END',
  SPACE:'\' \'',
  TAB:'KEY_TAB',
  PRINTSCREEN:'206',
  ENTER:'KEY_RETURN',
  UPARROW:'KEY_UP_ARROW',
  DOWNARROW:'KEY_DOWN_ARROW',
  LEFTARROW:'KEY_LEFT_ARROW',
  RIGHTARROW:'KEY_RIGHT_ARROW',
  UP:'KEY_UP_ARROW',
  DOWN:'KEY_DOWN_ARROW',
  LEFT:'KEY_LEFT_ARROW',
  RIGHT:'KEY_RIGHT_ARROW',
  PAGEUP:'KEY_PAGE_UP',
  PAGEDOWN:'KEY_PAGE_DOWN',
  CAPSLOCK:'KEY_CAPS_LOCK',
  DELETE:'KEY_DELETE',
  DEL:'KEY_DELETE',
  F1:'KEY_F1',
  F2:'KEY_F2',
  F3:'KEY_F3',
  F4:'KEY_F4',
  F5:'KEY_F5',
  F6:'KEY_F6',
  F7:'KEY_F7',
  F8:'KEY_F8',
  F9:'KEY_F9',
  F10:'KEY_F10',
  F11:'KEY_F11',
  F12:'KEY_F12'
};

var numpadMap = {
  NUM_0:'234',
  NUM_1:'225',
  NUM_2:'226',
  NUM_3:'227',
  NUM_4:'228',
  NUM_5:'229',
  NUM_6:'230',
  NUM_7:'231',
  NUM_8:'232',
  NUM_9:'233',
  NUM_ASTERIX:'221',
  NUM_ENTER:'224',
  NUM_MINUS:'222',
  NUM_PERIOD:'235',
  NUM_PLUS:'223',
  NUM_SLASH:'220'
}

var comboMap = {
  ALT:'KEY_LEFT_ALT',
  GUI:'KEY_LEFT_GUI',
  WINDOWS:'KEY_LEFT_GUI',
  COMMAND:'KEY_LEFT_GUI',
  CTRL:'KEY_LEFT_CTRL',
  CONTROL:'KEY_LEFT_CTRL',
  SHIFT:'KEY_LEFT_SHIFT'
};

var keyMap = {
  a:'97',
  b:'98',
  c:'99',
  d:'100',
  e:'101',
  f:'102',
  g:'103',
  h:'104',
  i:'105',
  j:'106',
  k:'107',
  l:'108',
  m:'109',
  n:'110',
  o:'111',
  p:'112',
  q:'113',
  r:'114',
  s:'115',
  t:'116',
  u:'117',
  v:'118',
  w:'119',
  x:'120',
  y:'121',
  z:'122'
};

class Duckuino {
  constructor() {
    this.keyMap = keyMap;
    this.commandMap = commandMap;
    this.comboMap = comboMap;
  }

  compile(inputCode){
    // Check if there is any code input at all
    if (inputCode == '' || inputCode == undefined)
    {
      _error('Error: No ducky script was entered!');
      return 'Error, look at the output below...';
    } 

    var parsedDucky = this.parser(inputCode);
    if (parsedDucky == '' || parsedDucky == undefined)
    {
      return 'Error, look at the output below...';
    } 

    // Build the Arduino code skeleton
    return '#include "Keyboard.h"\n'
	+ '\n'
	+ '#define buttonPin 6'
	+ '\n'
	+ 'int defaultDelay = 4;\n'
	+ 'int defaultCharDelay = 5;\n'
    + '\n'
    + 'void typeKey(int key){\n'
    + '  Keyboard.press(key);\n'
    + '  delay(defaultCharDelay);\n'
    + '  Keyboard.release(key);\n'
    + '}\n'
    + '\n'
    + 'void setup(){\n'
    + '  \n'
    + '  pinMode(buttonPin, INPUT_PULLUP);\n'
    + '  if(digitalRead(buttonPin) == LOW){\n'
    + '    \n'
    + '    Keyboard.begin();\n'
    + '    \n'
    + '    /* ----- Begin-Script -----*/\n'
    + '    \n'
    + parsedDucky
    + '    \n'
    + '    /* ----- End-Script -----*/\n'
    + '    \n'
    + '    Keyboard.end();\n'
    + '  }\n'
    + '}\n'
    + '\n'
    + 'void loop() {}';
  }

  // The parsing function
  parser(toParse){
    // Init chronometer
    var timerStart = Date.now();

    var parsedScript = '';

    // Trim whitespaces
    toParse = toParse.replace(/^ +| +$/gm, "");

    // Cuting the input in lines
    var lineArray = toParse.split('\n');

    // Loop every line
    for (var i = 0; i < lineArray.length; i++)
    {
      // Line empty, skip
      if (lineArray[i] === '' || lineArray[i] === '\n')
      {
        log('Info: Skipped line ' + (i + 1) + ', because was empty.');
        continue;
      }

      // Var who indicates to release all at the line end
      var releaseAll = false;

      // Outputs, for REPLAY/REPEAT COMMANDS
      if (parsedOut !== undefined && parsedOut !== '')
      {
        var lastLines = parsedOut;
        var lastCount = ((lastLines.split('\n')).length + 1);
      }
      var parsedOut = '';

      // Command known
      var commandKnown = false;

      // Cutting every line in words
      var wordArray = lineArray[i].split(' ');
      var wordOne = wordArray[0];

      // Handle commands
      switch(wordOne){
        case "STRING":
          wordArray.shift();

          var textString = wordArray.join(' ');

          // Replace all '"' by '\"' and all '\' by '\\'
          textString = textString.split('\\').join('\\\\').split('"').join('\\"');
          if (textString !== '')
          {
            parsedOut += '    Keyboard.print("' + textString + '");\n';
            commandKnown = true;
          } else {
            _error('Error: at line: ' + (i + 1) + ', STRING needs a text');
            return;
          }
          break;
        case "DELAY":
          wordArray.shift();

          if(wordArray[0] === undefined || wordArray[0] === '') {
            _error('Error: at line: ' + (i + 1) + ', DELAY needs a time');
            return;
          }

          if (! isNaN(wordArray[0]))
          {
            parsedOut += '    delay(' + wordArray[0] + ');\n';
            commandKnown = true;
          } else {
            _error('Error: at line: ' + (i + 1) + ', DELAY only acceptes numbers');
            return;
          }
          break;
		case "DEFAULTDELAY":
		case "DEFAULT_DELAY":
          wordArray.shift();

          if(wordArray[0] === undefined || wordArray[0] === '') {
            _error('Error: at line: ' + (i + 1) + ', DEFAULTDELAY needs a time');
            return;
          }

          if (! isNaN(wordArray[0]))
          {
            parsedOut += '    defaultDelay = ' + wordArray[0] + ';\n';
            commandKnown = true;
          } else {
            _error('Error: at line: ' + (i + 1) + ', DEFAULTDELAY only acceptes numbers');
            return;
          }
          break;
		case "DEFAULTCHARDELAY":
		case "DEFAULT_CHAR_DELAY":
          wordArray.shift();

          if(wordArray[0] === undefined || wordArray[0] === '') {
            _error('Error: at line: ' + (i + 1) + ', DEFAULTCHARDELAY needs a time');
            return;
          }

          if (! isNaN(wordArray[0]))
          {
            parsedOut += '    defaultCharDelay = ' + wordArray[0] + ';\n';
            commandKnown = true;
          } else {
            _error('Error: at line: ' + (i + 1) + ', DEFAULTCHARDELAY only acceptes numbers');
            return;
          }
          break;
        case "TYPE":
          wordArray.shift();

          if(wordArray[0] === undefined || wordArray[0] === '') {
            _error('Error: at line: ' + (i + 1) + ', TYPE needs a key');
            return;
          }

          if (keyMap[wordArray[0]] !== undefined)
          {
            commandKnown = true;
            // Replace the DuckyScript key by the Arduino key name
            parsedOut += '    typeKey(' + keyMap[wordArray[0]] + ');\n';
          } else {
            _error('Error: Unknown letter \'' + wordArray[0] +'\' at line: ' + (i + 1));
            return;
          }
          break;
        case "REM":
          wordArray.shift();

          // Placing the comment to arduino code
          if (wordArray[0] !== undefined && wordArray[0] !== '')
          {
            commandKnown = true;
            parsedOut += '    // ' + wordArray.join(' ') + '\n';
          } else {
            _error('Error: at line: ' + (i + 1) + ', REM needs a comment');
            return;
          }
          break;
        case "MOUSEMOVE":
          wordArray.shift();
          if (wordArray[0] != undefined && wordArray[0] != ''){
            commandKnown = true;
            var mouseParams = wordArray[0].split(',');
            parsedOut += '    AbsoluteMouse.move('+mouseParams[0]+', '+mouseParams[1];

            if(mouseParams[2] != undefined && mouseParams[2] != ''){
              parsedOut += ', '+mouseParams[2];
            }

            parsedOut += ');\n';
            wordArray.shift();
          } else {
            _error('Error: at line: ' + (i + 1) + ', MOUSEMOVE requires at least two parameters')
            return;
          }
          break;       
        case "MOUSECLICK":
          wordArray.shift();
          wordArray[0] = wordArray[0].toUpperCase();

          if (wordArray[0] == 'LEFT' || wordArray[0] == 'RIGHT' || wordArray[0] == 'MIDDLE' && wordArray[0] != undefined && wordArray[0] != ''){
            commandKnown = true;
            parsedOut += ' AbsoluteMouse.click(MOUSE_'+wordArray[0]+');\n'
            wordArray.shift();
          } else {
            _error('Error: at line: ' + (i + 1) + ', MOUSECLICK requires key (left/middle/right)')
            return;
          }
          break;
        case "REPEAT":
        case "REPLAY":
          wordArray.shift();

          if (wordArray[0] === undefined || wordArray[0] === '') {
            _error('Error: at line: ' + (i + 1) + ', REPEAT/REPLAY needs a loop count');
            return;
          }

          if (lastLines === undefined)
          {
            _error('Error: at line: ' + (i + 1) + ', nothing to repeat, this is the first line.');
            return;
          }

          if (! isNaN(wordArray[0]))
          {
            // Remove the lines we just created
            var linesTmp = parsedScript.split('\n');
            linesTmp.splice(-lastCount, lastCount);

            if (linesTmp.join('\n') === '')
              parsedScript = linesTmp.join('\n');
            else {
              parsedScript = linesTmp.join('\n') + '\n';
            }

            // Add two spaces at Begining
            lastLines = lastLines.replace(/^  /gm,'    ');

            // Replace them
            parsedOut += '    for(int i = 0; i < ' + wordArray[0] + '; i++) {\n';
            parsedOut += lastLines;
            parsedOut += '    }\n';

            commandKnown = true;
          } else {
            _error('Error: at line: ' + (i + 1) + ', REPEAT/REPLAY only acceptes numbers');
            return;
          }
          break;
        default:
          if (wordArray.length == 1)
          {
            if (comboMap[wordArray[0]] !== undefined)
            {
              commandKnown = true;

              parsedOut += '    typeKey(' + comboMap[wordArray[0]] + ');\n';
            }else if (commandMap[wordArray[0]] !== undefined) {
              commandKnown = true;

              parsedOut += '    typeKey(' + commandMap[wordArray[0]] + ');\n';
            }else {
              commandKnown = false;
              break;
            }
            wordArray.shift();
          }
          while (wordArray.length){
            if (comboMap[wordArray[0]] !== undefined)
            {
              commandKnown = true;
              releaseAll = true;

              parsedOut += '    Keyboard.press(' + comboMap[wordArray[0]] + ');\n';
            }else if (commandMap[wordArray[0]] !== undefined) {
              commandKnown = true;
              releaseAll = true;

              parsedOut += '    Keyboard.press(' + commandMap[wordArray[0]] + ');\n';
            }else if (keyMap[wordArray[0]] !== undefined) {
              commandKnown = true;
              releaseAll = true;

              parsedOut += '    Keyboard.press(' + keyMap[wordArray[0]] + ');\n';
            }else if (numpadMap[wordArray[0]] !== undefined){
			  commandKnown = true;
              releaseAll = true;

              parsedOut += '    typeKey(' + numpadMap[wordArray[0]] + ');\n';
			}else {
              commandKnown = false;
              break;
            }
            wordArray.shift();
          }
      }

      if (!commandKnown)
      {
        _error('Error: Unknown command or key \'' + wordArray[0] + '\' at line: ' + (i + 1) + '.');
        return;
      }

      // If we need to release keys, we do
      if (releaseAll)
        parsedOut += '    Keyboard.releaseAll();\n';

      parsedScript += parsedOut; // Add what we parsed
      if (i != (lineArray.length - 1))
        parsedScript += '\n    delay(defaultDelay);\n'; // Add new line if not the last line
    }

    var timerEnd = Date.now();
    var timePassed = new Date(timerEnd - timerStart);

    log('Successfuly parsed ' + (lineArray.length) + ' lines in ' + timePassed.getMilliseconds() + 'ms');
    return parsedScript;
  }
}
