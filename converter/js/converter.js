var specialChars = [['☺','1'],['☻','2'],['♥','3'],['♦','4'],['♣','5'],['♠','6'],['•','7'],['◘','8'],['○','9'],['◙','10'],['♂','11'],['♀','12'],['♪','13'],['♫','14'],['☼','15'],['►','16'],['◄','17'],['↕','18'],['‼','19'],['¶','20'],['§','21'],['▬','22'],['↨','23'],['↑','24'],['↓','25'],['→','26'],['←','27'],['∟','28'],['↔','29'],['▲','30'],['▼','31'],['~','126'],['⌂','127'],['Ç','128'],['ü','129'],['é','130'],['â','131'],['ä','132'],['à','133'],['å','134'],['ç','135'],['ê','136'],['ë','137'],['è','138'],['ï','139'],['î','140'],['ì','141'],['Ä','142'],['Å','143'],['É','144'],['æ','145'],['Æ','146'],['ô','147'],['ö','148'],['ò','149'],['û','150'],['ù','151'],['ÿ','152'],['Ö','153'],['Ü','154'],['ø','155'],['£','156'],['Ø','157'],['×','158'],['ƒ','159'],['á','160'],['í','161'],['ó','162'],['ú','163'],['ñ','164'],['Ñ','165'],['ª','166'],['º','167'],['¿','168'],['®','169'],['¬','170'],['½','171'],['¼','172'],['¡','173'],['«','174'],['»','175'],['░','176'],['▒','177'],['▓','178'],['│','179'],['┤','180'],['Á','181'],['Â','182'],['À','183'],['©','184'],['╣','185'],['║','186'],['╗','187'],['╝','188'],['¢','189'],['¥','190'],['┐','191'],['└','192'],['┴','193'],['┬','194'],['├','195'],['─','196'],['┼','197'],['ã','198'],['Ã','199'],['╚','200'],['╔','201'],['╩','202'],['╦','203'],['╠','204'],['═','205'],['╬','206'],['¤','207'],['ð','208'],['Ð','209'],['Ê','210'],['Ë','211'],['È','212'],['ı','213'],['Í','214'],['Î','215'],['Ï','216'],['┘','217'],['┌','218'],['█','219'],['▄','220'],['¦','221'],['Ì','222'],['▀','223'],['Ó','224'],['ß','225'],['Ô','226'],['Ò','227'],['õ','228'],['Õ','229'],['µ','230'],['þ','231'],['Þ','232'],['Ú','233'],['Û','234'],['Ù','235'],['ý','236'],['Ý','237'],['¯','238'],['´','239'],['­','240'],['±','241'],['‗','242'],['¾','243'],['¶','244'],['§','245'],['÷','246'],['¸','247'],['°','248'],['¨','249'],['·','250'],['¹','251'],['³','252'],['²','253'],['■','254'],[' ','255'],['€','0128'],['','0129'],['‚','0130'],['ƒ','0131'],['„','0132'],['…','0133'],['†','0134'],['‡','0135'],['ˆ','0136'],['‰','0137'],['Š','0138'],['‹','0139'],['Œ','0140'],['','0141'],['Ž','0142'],['','0143'],['','0144'],['‘','0145'],['’','0146'],['“','0147'],['”','0148'],['•','0149'],['–','0150'],['—','0151'],['˜','0152'],['™','0153'],['š','0154'],['›','0155'],['œ','0156'],['','0157'],['ž','0158'],['Ÿ','0159'],[' ','0160'],['¡','0161'],['¢','0162'],['£','0163'],['¤','0164'],['¥','0165'],['¦','0166'],['§','0167'],['¨','0168'],['©','0169'],['ª','0170'],['«','0171'],['¬','0172'],['­','0173'],['®','0174'],['¯','0175'],['°','0176'],['±','0177'],['²','0178'],['³','0179'],['´','0180'],['µ','0181'],['¶','0182'],['·','0183'],['¸','0184'],['¹','0185'],['º','0186'],['»','0187'],['¼','0188'],['½','0189'],['¾','0190'],['¿','0191'],['À','0192'],['Á','0193'],['Â','0194'],['Ã','0195'],['Ä','0196'],['Å','0197'],['Æ','0198'],['Ç','0199'],['È','0200'],['É','0201'],['Ê','0202'],['Ë','0203'],['Ì','0204'],['Í','0205'],['Î','0206'],['Ï','0207'],['Ð','0208'],['Ñ','0209'],['Ò','0210'],['Ó','0211'],['Ô','0212'],['Õ','0213'],['Ö','0214'],['×','0215'],['Ø','0216'],['Ù','0217'],['Ú','0218'],['Û','0219'],['Ü','0220'],['Ý','0221'],['Þ','0222'],['ß','0223'],['à','0224'],['á','0225'],['â','0226'],['ã','0227'],['ä','0228'],['å','0229'],['æ','0230'],['ç','0231'],['è','0232'],['é','0233'],['ê','0234'],['ë','0235'],['ì','0236'],['í','0237'],['î','0238'],['ï','0239'],['ð','0240'],['ñ','0241'],['ò','0242'],['ó','0243'],['ô','0244'],['õ','0245'],['ö','0246'],['÷','0247'],['ø','0248'],['ù','0249'],['ú','0250'],['û','0251'],['ü','0252'],['ý','0253'],['þ','0254'],['ÿ','0255']];
var commands = ["DEFAULTDELAY","DEFAULT_DELAY","DEFAULTCHARDELAY","DELAY","STRING","REPEAT","ENTER","GUI","SHIFT","ALT","CTRL","CAPSLOCK","DELETE","END","ESC","HOME","INSERT","PAGEUP","PAGEDOWN","SPACE","TAB","UP","DOWN","LEFT","RIGHT","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","NUM_0","NUM_1","NUM_2","NUM_3","NUM_4","NUM_5","NUM_6","NUM_7","NUM_8","NUM_9","NUM_ASTERIX","NUM_ENTER","NUM_Minus","NUM_PERIOD","NUM_PLUS","NUM_SLASH"];
var settingsOn = false;
var useLite  = true;

function autocorrect(str){
	str = str.replace(new RegExp("STRING", 'ig'),"STRING");
	str = str.replace(new RegExp("REM", 'ig'),"REM");
	
	var regex = new RegExp(/^(?!(STRING|REM) ).*/igm);
	var lines = str.match(regex);
	
	for(var i=0;i<lines.length;i++){
		var curLine = lines[i];
		for(var j=0;j<commands.length;j++){
			curLine = curLine.replace(new RegExp(commands[j], 'ig'),commands[j]);
		}
		str = str.replace(new RegExp("^"+lines[i]+"$",'igm'),curLine);
		
	}
	return str;
}

function deleteComments(str){
	str = str.replace(new RegExp(/^REM .*/igm),"");
	return str;
}

function convertLineBreaks(str){
	str = str.replace(new RegExp("\r", "g"),"\n");
	return str;
}

function deleteBreaks(str){
	str = str.replace(new RegExp("^( )*\n", 'igm'),"");
	return str;
}
	
function getAltCode(num){
	var keyStr = "ALT";
	var code = ""+specialChars[num][1];
	for(var i=0;i<code.length;i++){
		keyStr += " ";
		keyStr += "NUM_"+code[i];
	}
	return keyStr;
}
	
function convertAltCodes(str){
	for(var i=0;i<specialChars.length;i++){
		str = str.replace(new RegExp(specialChars[i][0], "g"),"\n"+getAltCode(i)+"\nSTRING"+" ");
	}
	str += "\n";
	str = str.replace(new RegExp("STRING \n", "g"),"");
	return str;
}
		
function optimize(str){
	var lines = [];
	var lineNum = 0;
			
	var line = "";
	for(var i=0;i<str.length;i++){
		var c = str.charAt(i);
		if(c == "\n"){
			lines[lineNum] = line;
			lineNum++;
			line = "";
		}
		else line += c;
	}
	
	for(var i=0;i<lines.length-1;i++){
		var h = i;
		var same = (lines[h] == lines[h+1]);
		var count = 0;
		while(same && h<lines.length-1 && lines[h+1] != "undefined" && (typeof lines[h+1] !== "undefined")){
			count++;
			h++;
			same = lines[h] == lines[h+1];
		}
		if(count > 0){
			lines[i+1] = "REPEAT "+count;
			var linesLen = lines.length;
			var _linesEnd = lines.splice(i+count+1,linesLen);
			var _linesBegin = lines.splice(0,i+2);
			lines = _linesBegin.concat(_linesEnd);
		}
	}

	str = "";
	for(var i=0;i<lines.length;i++) str += lines[i]+"\n";
	
	return str;
}

function addDelay(str){
	var beginStr = str.match(new RegExp(/^(?!(REM) ).*/igm))[0];
	if(!(new RegExp(/^DELAY /igm)).test(beginStr)) str = "DELAY 1000\n"+str;
	return str;
}
		  
function convert(){
	var script = document.getElementById('input').value;
	script = convertLineBreaks(script);
	if($('#convertALTCodes').prop('checked')) script = convertAltCodes(script);
	if($('#deleteComments').prop('checked'))script = deleteComments(script);
	script = deleteBreaks(script);
	if($('#optimize').prop('checked')) script = optimize(script);
	if($('#delay').prop('checked')) script = addDelay(script);
	if($('#autoCorrect').prop('checked')) script = autocorrect(script);
	$('#output').val(script);
	var duckuino = new Duckuino();
	//saveData("malduino.ino", duckuino.compile(script));
}
		
function saveData(fileName, data){
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	
	var blob = new Blob([data], {type: "octet/stream"});
	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
}
		
function download(){
	var duckuino = new Duckuino();
	saveData("test123.txt", duckuino.compile("GUI r\nSTRING Hello World"));
}

function openSettings(){
	if(!settingsOn) $('#settings').show('normal');
	else $('#settings').hide('normal');
	settingsOn = !settingsOn;
}

function changeModel(mode){
	useLite = mode;
	if(useLite){
		$('#lite').addClass('selected');
		$('#elite').removeClass('selected');
	}else if(!useLite){
		$('#lite').removeClass('selected');
		$('#elite').addClass('selected');
	}
}