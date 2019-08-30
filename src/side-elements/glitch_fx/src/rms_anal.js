let audioFile;
let fileZero, fileOne, fileTwo, fileThree, fileFour, fileFive;
let analyzer = new p5.Amplitude();
let reverb = new p5.Reverb();
let button;

function preload(sketch) {
  const prefix = "src/side-elements/glitch_fx/";
  fileZero = sketch.loadSound(prefix + "assets/Loop_Rhythm.mp3");
  fileOne = sketch.loadSound(prefix + "assets/Pad_01.mp3");
  fileTwo = sketch.loadSound(prefix + "assets/snd3.mp3");
  fileThree = sketch.loadSound(prefix + "assets/sndArea2.mp3");
  fileFour = sketch.loadSound(prefix + "assets/sndArea3.mp3");
  fileFive = sketch.loadSound(prefix + "assets/sndArea4.mp3");
}

// RHYTHM LOOP
function PlayerZeroPlay() {
  if (fileZero && !fileZero.isPlaying()) {
    audioFile.setVolume(1.3);
    fileZero.loop();
  }
}

// TEXTURE LOOP
function PlayerOnePlay() {
  if (fileOne && !fileOne.isPlaying()) {
    fileOne.loop();
  }
}

// AREA 1 -> GLITCH 1 -> PLAYER 2
function PlayerTwoPlay() {
  audioFile = fileTwo;
  // Patch the input to an volume analyzer
  analyzer.setInput(audioFile);

  if (audioFile && !audioFile.isPlaying()) {
    audioFile.setVolume(0.8);
    audioFile.play();
    reverb.process(audioFile, 5, 2);
  } else if (triggerAreaOne === 0) {
    if (audioFile && audioFile.isPlaying()) {
      audioFile.stop();
    }
  }
}

function PlayerTwoStop() {
  if (audioFile && audioFile.isPlaying()) {
    if (audioFile.url === "src/side-elements/glitch_fx/assets/snd3.mp3")
      audioFile.stop();
  }
}

// AREA 2 -> GLITCH 2 -> PLAYER 3
function PlayerThreePlay() {
  audioFile = fileThree;
  // Patch the input to an volume analyzer
  analyzer.setInput(audioFile);
  if (audioFile && !audioFile.isPlaying()) {
    audioFile.setVolume(0.8);
    audioFile.play();
    reverb.process(audioFile, 5, 2);
  } else if (triggerAreaTwo === 0) {
    if (audioFile && audioFile.isPlaying()) audioFile.stop();
  }
}

function PlayerThreeStop() {
  if (audioFile && audioFile.isPlaying()) {
    if (audioFile.url === "src/side-elements/glitch_fx/assets/sndArea2.mp3")
      audioFile.stop();
  }
}

// AREA 3 -> GLITCH 3 -> PLAYER 4
function PlayerFourPlay() {
  audioFile = fileFour;
  // Patch the input to a volume analyzer
  analyzer.setInput(audioFile);
  // console.log(analyzer);
  if (audioFile && !audioFile.isPlaying()) {
    audioFile.setVolume(0.8);
    audioFile.play();
    reverb.process(audioFile, 5, 2);
    // console.log("playingFour");
  } else if (triggerAreaThree === 0) {
    if (audioFile && audioFile.isPlaying()) audioFile.stop();
  }
}

function PlayerFourStop() {
  if (audioFile && audioFile.isPlaying()) {
    if (audioFile.url === "src/side-elements/glitch_fx/assets/sndArea3.mp3")
      audioFile.stop();
  }
}

// AREA 4 -> GLITCH 4 -> PLAYER 5
function PlayerFivePlay() {
  audioFile = fileFive;
  // Patch the input to an volume analyzer
  analyzer.setInput(audioFile);
  if (audioFile && !audioFile.isPlaying()) {
    audioFile.setVolume(0.7);
    audioFile.play();
    reverb.process(audioFile, 5, 2);
  } else if (triggerAreaFour === 0) {
    if (audioFile && audioFile.isPlaying()) audioFile.stop();
  }
}
function PlayerFiveStop() {
  if (audioFile && audioFile.isPlaying()) {
    if (audioFile.url === "src/side-elements/glitch_fx/assets/sndArea4.mp3")
      audioFile.stop();
  }
}

// RMS ANALYZER
let rms = 0;
// DEFINE THRESHOLD
let thresh = 0.02;

let rmsTOne = 0;
let rmsSpeed = 0;
let rmsRandX = 0;

let rmsRangeMin = 0;
let rmsOffSetX = 0;
let rmsRand = 0;
let rmsStartX = 0;
let rmsStartY = 0;
let rmsRectH = 0;

let rmsN = 0;
let rmsNTime = 0;

let rmsScat = 0;
let rmsObjXMin = 0;
let rmsObjXMax = 0;
let rmsObjYMin = 0;
let rmsObjYMax = 0;

setInterval(function() {
  if (fileOne) {
    PlayerOnePlay();
  }
  if (fileZero) {
    setTimeout(() => {
      PlayerZeroPlay();
    }, 45000);
  }
  if (triggerAreaOne === 1) {
    PlayerTwoPlay();
    PlayerThreeStop();
    PlayerFourStop();
  } else {
    PlayerTwoStop();
    if (triggerAreaTwo === 1) PlayerThreePlay();
  }
  if (triggerAreaThree === 1) {
    PlayerFourPlay();
    PlayerThreeStop();
    PlayerTwoStop();
  } else {
    PlayerFourStop();
    if (triggerAreaThree === 1) PlayerFourPlay();
  }
  if (triggerAreaFour === 1) {
    PlayerFivePlay();
    PlayerFourStop();
    PlayerThreeStop();
    PlayerTwoStop();
  } else {
    PlayerFiveStop();
    if (triggerAreaFour === 1) PlayerFivePlay();
  }
}, 60);

// RMS VALUES ARE SENT TO GLITCH.JS
setInterval(function() {
  if (analyzer) {
    rms = 0.02 + analyzer.getLevel() * 2;
    // o OBJECT
    rmsTOne = rms * 1000;
    rmsSpeed = rms * 20;
    rmsRandX = rms * 56;
    // SHIFT LINE
    rmsRangeMin = rms * 450;
    rmsOffSetX = rms * 40;
    // console.log(rmsOffSetX)
    rmsRand = rms * 16;
    rmsSpeed = rms * 24;
    rmsRandX = rms * 80;

    // GET RANDOM RECT
    rmsStartX = rms * (800 - 30);
    rmsStartY = rms * (450 - 50);
    rmsRectH = rms * 50;
    // console.log(rmsStartY);

    // SHOW
    rmsN = rms * 100;
    rmsNTime = 40 + rms * 400;

    //SCAT IMG
    rmsScat = rms * 100;
    rmsObjXMin = rms * 800 * 0.3;
    rmsObjXMax = rms * 800 * 0.7;
    rmsObjYMin = rms * 450 * 0.1;
    rmsObjYMax = rms * 450;
  }
}, 60);
