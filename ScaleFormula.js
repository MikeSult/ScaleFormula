//
// ScaleFormula.js
//
//
//  Module - ScaleFormula
//
var ScaleFormula = (function() {

// colors are used for background color of the click boxes:
// colors[0] = unselected
// colors[1] = selected
// colors[2] = first and last note (very light green)
var colors = ['lightgrey', 'lightgreen','#ddffdd'];

var names = ['0','1','2','3','4','5','6','7','8','9','10','11'];
var structure = [0,1,2,3,4,5,6,7,8,9,10,11];

// scale structures
var major = [0,2,4,5,7,9,11,12];
var nat_minor = [0,2,3,5,7,8,10,12];
var harm_minor = [0,2,3,5,7,8,11,12];
var mel_minor = [0,2,3,5,7,9,11,12];
var whole_tone = [0,2,4,6,8,10,12];
var minor_pentatonic = [0,3,5,7,10,12];
var major_pentatonic = [0,2,4,7,9,12];
var minor_blues = [0,3,5,6,7,10,12];
var major_blues = [0,2,3,4,7,9,12];
var half_whole_dim = [0,1,3,4,6,7,9,10,12];
var whole_half_dim = [0,2,3,5,6,8,9,11,12];

var offsetFromC = {
    'C': 0, 'Cb': 11, 'C#': 1,
    'Db': 1, 'D': 2, 'D#': 3,
    'Eb': 3, 'E': 4, 'E#': 5,
    'Fb': 4, 'F': 5, 'F#': 6,
    'Gb': 6, 'G': 7, 'G#': 8,
    'Ab': 8, 'A': 9, 'A#': 10,
    'Bb': 10, 'B': 11, 'B#': 0    
}

function resetScreen() {
    createNumberRow('1', names, structure);
    resetRowColor(1);
    clearEvalDiv();
	var zero = document.getElementById('1_0');
	var twelve = document.getElementById('1_12');
	highlight(zero);
	highlight(twelve);
}


function resetNumberBoxes() {
    document.getElementById('row1').innerHTML = createNumberRow(1, );
    
}


function clearEvalDiv() {
    document.getElementById('evalDiv').innerHTML = "";
}


function getScaleStructure() {
    var structure;

    var scaleTypeMenu = document.getElementById('scaleType');
    var scaleTypeMenuChoice = scaleTypeMenu.options[scaleTypeMenu.selectedIndex].value;
    console.log("scaleTypeMenuChoice="+scaleTypeMenuChoice);
    if(scaleTypeMenuChoice == '0,2,4,5,7,9,11') { // major
        structure = major;
    } else if(scaleTypeMenuChoice == '0,2,3,5,7,8,10') {
        structure = nat_minor;
    } else if(scaleTypeMenuChoice == '0,2,3,5,7,8,11') {
        structure = harm_minor;
    } else if(scaleTypeMenuChoice == '0,2,3,5,7,9,11') {
        structure = mel_minor;
    } else if(scaleTypeMenuChoice == '0,2,4,6,8,10') {
        structure = whole_tone;
    } else if(scaleTypeMenuChoice == '0,3,5,7,10') {
        structure = minor_pentatonic;
    } else if(scaleTypeMenuChoice == '0,2,4,7,9') {
        structure = major_pentatonic;
    } else if(scaleTypeMenuChoice == '0,3,5,6,7,10') {
        structure = minor_blues;
    } else if(scaleTypeMenuChoice == '0,2,3,4,7,9') {
        structure = major_blues;
    } else if(scaleTypeMenuChoice == '0,1,3,4,6,7,9,10') {
        structure = half_whole_dim;
    } else if(scaleTypeMenuChoice == '0,2,3,5,6,8,9,11') {
        structure = whole_half_dim;
    }
    return structure;
}

function getScaleName(structure) {
    var name;
    if(structure === major) {
        name = 'major';
    } else if(structure === nat_minor) {
        name = 'natural minor';
    } else if(structure === harm_minor) {
        name = 'harmonic minor';
    } else if(structure === mel_minor) {
        name = 'melodic minor';  
    } else if(structure === whole_tone) {
        name = 'whole tone';  
    } else if(structure === minor_pentatonic) {
        name = 'minor pentatonic';  
    } else if(structure === major_pentatonic) {
        name = 'major pentatonic';  
    } else if(structure === minor_blues) {
        name = 'minor blues';  
    } else if(structure === major_blues) {
        name = 'major blues';  
    } else if(structure === half_whole_dim) {
        name = 'half/whole diminished';  
    } else if(structure === whole_half_dim) {
        name = 'whole/half diminished';  
    }
    return name;
}



function mDown(obj) {
    // determine the pitch number, noteName
    var halfStepsFromRootStr = obj.id.slice(2);
    var halfStepsFromRoot = Number(halfStepsFromRootStr);
    var midiNote = 60 + halfStepsFromRoot;
    if(obj.id.charAt(0) == '0') {
        midiNote = 60 + halfStepsFromRoot;
    }
    var noteName = MIDI_SHARP_NAMES[midiNote];
    
    // manage color change on mouseDown
    console.log('obj.id='+obj.id);
    if(obj.style.backgroundColor == colors[1]) {
        if(halfStepsFromRoot == 0 || halfStepsFromRoot == 12) {
            // make the first and last a special color
            obj.style.backgroundColor = colors[2];        
        } else {
            obj.style.backgroundColor = colors[0];
        }
    } else {
        obj.style.backgroundColor = colors[1];
//        stopIt();
        playIt(noteName);    
    }
}

function highlight(obj) {
    // manage color change on mouseDown
    console.log('obj.id='+obj.id);
    obj.style.backgroundColor = colors[2];
}

function resetRowColor(rowNum) {
    var id1;
    var obj1;
    var evalDiv;
    var studentChoices = [0];
    for(let i=1; i<12; i++) {
        id1 = '1_'+i;
        console.log('id1='+id1);
        obj1 = document.getElementById(id1);
        obj1.style.backgroundColor = colors[0];
    }
}

function getStudentChoices() {
    var id1;
    var obj1;
    var evalDiv;
    var studentChoices = [0];
    for(let i=1; i<12; i++) {
        id1 = '1_'+i;
        console.log('id1='+id1);
        obj1 = document.getElementById(id1);
        console.log(''+id1+' backgroundColor='+obj1.style.backgroundColor);
        if(obj1.style.backgroundColor == colors[1]) {
            studentChoices.push(Number(obj1.id.slice(2)));
        }
    }
    // octave note
    studentChoices.push(12);
	console.log('studentChoices='+studentChoices);
	return studentChoices;
}


function play() {
    var studentChoices = getStudentChoices();
//    var correctScale = getCorrectScale();
//    var responseString = 'Your choices = '+ studentChoices;
//    var isAllCorrect = true;
    // look at each of the studentChoices

    // create the times and notes for playScale()
    var timesAndNotes = [];
    var pair = [];
    var startMIDI = 60;
    var duration = 0.5;
    for(let i=0; i<studentChoices.length; i++) {
        pair.push('+'+(i*duration));
        pair.push(MIDI_SHARP_NAMES[startMIDI+studentChoices[i]]);
        timesAndNotes.push(pair);
        pair = [];
    }
    console.log('timesAndNotes='+timesAndNotes);
    playScale(timesAndNotes, 'up');

}


function evaluateAnswer() {
    var studentChoices = getStudentChoices();
    var correctScale = getScaleStructure();
    var scaleName = getScaleName(correctScale);
    var responseString = 'Your choices = '+ studentChoices;
    var isAllCorrect = true;
	var evalDiv = document.getElementById('evalDiv');
    // look at each of the studentChoices
	if(studentChoices.length !== correctScale.length) {
		responseString += '<br />You have selected the <b class="redColorBold"> wrong number </b> of the choices.';
		evalDiv.innerHTML = responseString;
		return;
	}
    for(var i=0; i<studentChoices.length; i++) {
        if(studentChoices[i] !== correctScale[i]) {
            responseString += '<br />your choice of <b class="redColorBold">'+studentChoices[i]+'</b> half steps for note '+(i+1)+' is <b class="redColorBold">incorrect</b>, the <b class="greenColorBold">correct</b> interval is <b class="greenColorBold">'+correctScale[i]+'</b> half steps';
            isAllCorrect = false;
        }
    }
    if(isAllCorrect) {
        responseString += '<br />That is the <b class="greenColorBold">correct structure</b> for the <b class="greenColorBold">'+ scaleName + '</b> scale.';
    }
	evalDiv.innerHTML = responseString;
	return;
}

function createRow(rowNum, noteNames, intervalStructure) {
    var usesChromaticScale = false;
    if(noteNames.length === 12)
        usesChromaticScale = true;
    var html = '';
    var oneBoxOpen = '<div class="pitchBox col-1" onclick="ScaleFormula.mDown(this)" id="'; 
    var oneMask = '<div class="pitchBoxMask col-1">';
    var endBox  = '</div>';
    var isBox = false;
    var nameIndex = 0;
    var structureIndex = 0;
    for(let i=0; i<12; i++) {
        // check to see if this is a box or mask
        if(intervalStructure[structureIndex] == i) {
          isBox = true;
          structureIndex++;
        }
        if(isBox) {
            html += oneBoxOpen
            html += ''+rowNum+'_'+i+'">'
            html += noteNames[nameIndex];
            html += endBox;
            nameIndex++;
        } else {
            html += oneMask;
            if(usesChromaticScale) {
                html += noteNames[nameIndex];
                nameIndex++;
            } else {
                html += '.';
            }
            html += endBox;            
        }
        isBox = false;
    }
    html += oneBoxOpen
    html += ''+rowNum+'_12">'
    html += noteNames[0];
    html += endBox;
    return html;
}

function createNumberRow(rowNum) {
// names are actually numbers in this case
    var noteNames = names;
    var intervalStructure = structure;
    var usesChromaticScale = false;
    if(noteNames.length === 12)
        usesChromaticScale = true;
    var html = '';

//    var oneBoxOpen = '<div class="pitchBox col-1" onclick="mDown(this)" id="'; 
    // using Module pattern, we need the Module namespace with inline onclick handler 'mDown'
    var oneBoxOpen = '<div class="pitchBox col-1" onclick="ScaleFormula.mDown(this)" id="'; 
    var oneMask = '<div class="pitchBoxMask col-1">';
    var endBox  = '</div>';
    var isBox = false;
    var nameIndex = 0;
    var structureIndex = 0;
    for(let i=0; i<12; i++) {
        // check to see if this is a box or mask
        if(intervalStructure[structureIndex] == i) {
          isBox = true;
          structureIndex++;
        }
        if(isBox) {
            html += oneBoxOpen
            html += ''+rowNum+'_'+i+'">'
            html += noteNames[nameIndex];
            html += endBox;
            nameIndex++;
        } else {
            html += oneMask;
            if(usesChromaticScale) {
                html += noteNames[nameIndex];
                nameIndex++;
            } else {
                html += '.';
            }
            html += endBox;            
        }
        isBox = false;
    }
    html += oneBoxOpen
    html += ''+rowNum+'_12">'
    html += '12';  // '+noteNames[0];
    html += endBox;
    return html;
}


function createBWRow(offset) {
    var html = '';
    var whiteBoxOpen = '<div class="whiteBox col-1">'; 
    var blackBoxOpen = '<div class="blackBox col-1">';
    var endBox  = '</div>';
    console.log('offset='+offset);
    for(let i=offset; i<(12+offset); i++) {
        if(i%12==1 || i%12==3 || i%12==6 || i%12==8 || i%12==10 ) {
            html += blackBoxOpen
//            html += '.';
            html += endBox;
        } else {
            html += whiteBoxOpen
//            html += '.';
            html += endBox;
        }
    }
    if(offset==1 || offset==3 || offset==6 || offset==8 || offset==10 ) {
	    html += blackBoxOpen
	} else {
	    html += whiteBoxOpen
    }
//	html += '.';
	html += endBox;
    return html;
}



function setArray(startLetter) {

  var letters1 = ['C','C#','Cx','Eb','E','F','Gb','G','Ab','A','Bb','B'];
  var letters2 = ['B#','Db','D','D#','Fb','E#','F#','Fx','G#','Gx','A#','Cb'];
  var alphaLetters = ['C','D','E','F','G','A','B'];
  var newArray = [];
  for(let i=0; i<12; i++) {
      if(startLetter == letters1[i]) {
          for(let j=i; j<12+i; j++) {
//              console.log("letters1", letters1[ j % letters1.length ]);
              newArray.push(letters1[ j % letters1.length ]);
          }
          break;
      } else if(startLetter == letters2[i]) {
          for(let j=i; j<12+i; j++) {
//              console.log("letters2", letters1[ j % letters1.length ]);
              newArray.push(letters2[ j % letters1.length ]);
          }      
          break;
      }
  }
  return newArray;
}

function setAlphaArray(startLetter) {
    var alphaLetters = ['C','D','E','F','G','A','B'];
    var newArray = [];
    for(let i=0; i<8; i++) {
        if(startLetter.includes(alphaLetters[i]) ) {
            for(let j=i; j<8+i; j++) {
                newArray.push(alphaLetters[ j % alphaLetters.length ]);
            }
            break;
        }
    }
    return newArray;
}

var enharmonics = {
    'Cb': 'B',
    'B': 'Cb',
    'B#': 'C',
    'C': 'B#',
    'C#': 'Db',
    'Db': 'C#',
    'D': 'Cx',
    'Cx': 'D',
    'Eb': 'D#',
    'D#': 'Eb',
    'E': 'Fb',
    'Fb': 'E',
    'F': 'E#',
    'E#': 'F',
    'F#': 'Gb',
    'Gb': 'F#',
    'G': 'Fx',
    'Fx': 'G',
    'G#': 'Ab',
    'Ab': 'G#',
    'A': 'Gx',
    'Gx': 'A',
    'A#': 'Bb',
    'Bb': 'A#'
}


//-----------------------------------------------------
// Tone.js play code
//-----------------------------------------------------

function playAudio() {
	var player = new Tone.Player({	"url" : "./path/to/sample.mp3", "autostart" : false, }).toMaster();
	// any setup?
	
	// play the file
	player.start()
}


var synth = new Tone.Synth().toMaster();
function playIt(note){
    if(!synth) {
        synth = new Tone.Synth().toMaster();
    }
    synth.volume.value = Number(document.getElementById('volume').value);
    var duration = 1.0;
    console.log('synth.volume.value='+synth.volume.value+' note='+note+' duration='+duration);
    synth.triggerAttackRelease(note, duration);
}


var myPart;
var melodicPattern = 'up';
function playScale(scale, melodicPattern) {
//    startTimestamp();
//    console.log("playScale()");
    // clear evalDiv
    document.getElementById('evalDiv').innerHTML = "";

    Tone.Transport.stop(); // stop any playing scale before restarting.
    Tone.Transport.cancel(0);

//    console.log(myPart);
    if(myPart !== undefined) {
        myPart.dispose();
    }
    myPart = new Tone.Part(function(time, note){
	    synth.triggerAttackRelease(note, "8n", time);
        }, scale);
    //begin at the beginning
    synth.volume.value = Number(document.getElementById('volume').value);
//    updateVolume();
    myPart.start(0);   
//    scaleNotesSaved = scale;
    Tone.Transport.start("+0.1"); // "+0,1" is for a bug problem with Web Audio when starting at "0"
//    console.log("playScale() time=" + stopTimeStamp() );

    window.setTimeout(stopIt, 5000);

} 


function stopIt(){
   Tone.Transport.stop();
   Tone.Transport.cancel(0);
}

function updateTempo()  {
//	var tempo = document.myForm.tempo.value;
//	Tone.Transport.bpm.value = tempo   
}

function updateVolume()  {
	var volune = document.getElementById('volume').value;
	synth.volume.value = volume;   
}


var MIDI_SHARP_NAMES = ['B#_0',  'C#_1', 'Cx_1', 'D#_1',   'E_1',  'E#_1',  'F#_1', 'Fx_1',  'G#_1', 'Gx_1', 'A#_1', 'B_1',
                    'B#_1', 'C#0', 'Cx0', 'D#0', 'E0', 'E#0', 'F#0', 'Fx0', 'G#0', 'Gx0', 'A#0', 'B0',
                    'B#0', 'C#1', 'Cx1', 'D#1', 'E1', 'E#1', 'F#1', 'Fx1', 'G#1', 'Gx1', 'A#1', 'B1',
                    'B#1', 'C#2', 'Cx2', 'D#2', 'E2', 'E#2', 'F#2', 'Fx2', 'G#2', 'Gx2', 'A#2', 'B2',
                    'B#2', 'C#3', 'Cx3', 'D#3', 'E3', 'E#3', 'F#3', 'Fx3', 'G#3', 'Gx3', 'A#3', 'B3',
                    'B#3', 'C#4', 'Cx4', 'D#4', 'E4', 'E#4', 'F#4', 'Fx4', 'G#4', 'Gx4', 'A#4', 'B4',
                    'B#4', 'C#5', 'Cx5', 'D#5', 'E5', 'E#5', 'F#5', 'Fx5', 'G#5', 'Gx5', 'A#5', 'B5',
                    'B#5', 'C#6', 'Cx6', 'D#6', 'E6', 'E#6', 'F#6', 'Fx6', 'G#6', 'Gx6', 'A#6', 'B6',
                    'B#6', 'C#7', 'Cx7', 'D#7', 'E7', 'E#7', 'F#7', 'Fx7', 'G#7', 'Gx7', 'A#7', 'B7',
                    'B#7', 'C#8', 'Cx8', 'D#8', 'E8', 'E#8', 'F#8', 'Fx8', 'G#8', 'Gx8', 'A#8', 'B8',
                    'B#8', 'C#9', 'Cx9', 'D#9', 'E9', 'E#9', 'F#9', 'Fx9'];

//-----------------------------

return {
    createBWRow: createBWRow,
    createNumberRow: createNumberRow,
    resetScreen: resetScreen,
    evaluateAnswer: evaluateAnswer,
    play: play,
    highlight: highlight,
    mDown: mDown
};

})();

//---------------------------/