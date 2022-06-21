
/*
Serial handshaking and multi-value strings
using p5.webserial.
Sends an 'x' out the serial port on port opening,
then waits for serial to come in. Expects
a CSV string. Separates it into three parts, 
then sends an 'x' to request another string
from the sender.
created 31 May 2022
modified 11 Jun 2022
by Tom Igoe
*/
// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();

// HTML button object:
// DEFINE GLOBAL VARS
let portButton;
let jankyText = 'topic 1';
let inData; // for incoming serial data
let outData; // for outgoing data
// variables for the circle to be drawn:
// let locH, locV;
// let circleColor = 255;
let playing = false;

let debate; //topic-1.mp4
let debate1; //WinnerPredict-2.mp4
let debate2; //BurkaDebate-3.mp4

//fonts used in game
let karma;
let x = 600;

let button1;
let button2;
let button3;
let button4left;
let button5up;
let button6right;
let counter = 0;
let teamCounterA = 0;
let teamCounterB = 0;
let trackButton1 = 1; // trackingFirstChoice
let trackButton2 = 1; // trackingSecondChoice
let trackButton3 = 1; // trackingNothing
//let trackButton5 = 1; // trackingNext Choice
let trackButton6 = 1; // trackingNext game state
let gameState = "beginning";
let gameStateCounter = 0;
let gameStates =["beginning", "preDebate", "doPreDebate", "doDebate", "postDebate", 'countDown'];


// define functions
function beginning() {
  background(0); // black background
  textSize(64);
  text('GAME START, Move the joystick UP', width / 2, height / 2);
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);

  // button function 
  // if (button1 == 0 && trackButton1 == 1) {
  //   // console.log("a")
  //   trackButton1 = 0;
  // }
  // //WHEN BUTTON IS RELEASED 
  // if (button1 == 1 && trackButton1 == 0) {
  //   // console.log("b")
  //   trackButton1 = 1;
  //   if (gameState == "beginning") {
  //     gameState = "initpreDebate";
  //   }

    if(keyIsPressed){
      console.log("Hello");
      gameState = "initpreDebate"
    }
  }
// }

//Load first video asking player to choose options 1, 2, 3 about banning the burka
function initPreDebatefunc() {
  // console.log('initing');
  background(0);
  imageMode(CENTER);
  textAlign(CENTER);
  text("Choose 1, 2, or 3", width/2, height/2); // //put image of prompt here
  text(jankyText, width / 2, height / 8);
  text(counter, 100, 100);
  textSize(50);
  image(debate, width / 2, height / 2, 800, 600);
  // debate.stop();
    // console.log(debate);
    // if(debate)
    debate.play();
    debate.onended(onendedShow);

}

function initGameTimer(){
  // console.l
  background(0);
  imageMode(CENTER);
  textAlign(CENTER);
  // text("Choose 1, 2, or 3", width/2, height/2); // //put image of prompt here
  text(x, width / 2, height / 8);
  text(counter, 100, 100);
  textSize(50);
  x = x - 1;
  if(x < 2){
    counter = counter - 10;
    gameState = 'doPreDebate';
  }
  
  // setInterval(function(){
  //   console.log(x);
  //   x = x - 1;
  // },10000);

}
function onendedShow(){
  // text("hello world", width / 2, height / 8);
  // jankyText = 'hello world';
//   var countDownDate = new Date().getTime() + 11000;
//  // Update the count down every 1 second
//   var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;
    
//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   // Output the result in an element with id="demo"
//   document.getElementById("demo").innerHTML =  seconds + "s ";
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     // document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);
//   // set gamestate == countdowntimer
//   counter = counter - 10;
//   debate.pause();
    gameState = 'countDown';
}
// doPreDebatefunc
//load second video asking player to choose a winner
function doPreDebatefunc() {
  // console.log('running')
  // gameState = "preDebate"
  // debate.stop();
  background(0);
  text(counter, 100, 100);
  text("Move the joystick up!", width/2, height/2); // //put image of prompt here
  debate.pause();
  debate1.play();
  image(debate1, width / 2, height / 2, 800, 600);
  // debate.onended(video2Done);
  // debate1.stop();
}
// function video2Done(){
  
// }
//load third video watching the debate
function doDebatefunc() {
  //gameState = "debate"
  background(0);
  //text(counter, 100, 100);
  text(teamCounterA, 100, 100);
  text(teamCounterB, 100, 150);
  debate1.pause();
  debate2.play();
  image(debate2, width / 2, height / 2, 800, 600);

  // debate2.stop();
}
function postDebatefunc() {
  gameState = "postDebate"
  background(0);
  text(counter, 100, 100);
  debate2.pause();
  text("Is debate about winning?", width / 2, height / 2);
  textSize(40);
  fill(0, 255, 0);
}

function setup() {
  console.log("setting up");
  createCanvas(windowWidth, windowHeight); // make the canvas
  //noCanvas();
  debate = createVideo(['ASSETS/topic-1.mp4'], video1Loaded);
  // debate.pause();
  // debate.hide();

  debate1 = createVideo(['ASSETS/WinnerPredict-2.mp4']);
  debate1.hide();

  debate2 = createVideo(['ASSETS/BurkaDebate-3.mp4']);
  debate2.hide();

  //load game font
  karma = loadFont('ASSETS/karma-future.otf');
  textFont(karma);

  // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
}

function video1Loaded(){
  // alert('loaded');
}
//playing and pause of video
// function toggleVid () {
//   if (playing) {
//     debate.pause();
//     button.html ('play');
//   } else {
//     debate.loop();
//     button.html('pause');
//   }
//     playing =!playing;
//   }

function draw() {

  if (gameState == "beginning") {

    beginning();
    // background(0); // black background
    // textSize(50);
    // text('GAME START, PRESS 1', width/2, height/2);
    // fill(0, 255, 0);
    // textAlign(CENTER,CENTER);

    //   if (button1 ==0 && trackButton1 ==1) {
    //     trackButton1 = 0;
    //   }
    //  //WHEN BUTTON IS RELEASED 
    //   if (button1 ==1 && trackButton1 ==0) {
    //     // console.log("b")
    //     trackButton1 = 1; 
    //     gameState = "preDebate";
    //   }
  }
  if (gameState == "preDebate") {
    initPreDebatefunc();

    // if (gameState =="preDebate") {
    //   background (255);
    //   text ("topic 1", width/2, height/2);
    //   textSize (50);

  }
  if (gameState == "doPreDebate") {
    doPreDebatefunc();
}
  if (gameState == "doDebate") {
    doDebatefunc();
}
  if(gameState == 'countDown'){
    initGameTimer();
  }

  if (gameState == "postDebate") {
  postDebatefunc();
  }
}

// if there's no port selected,
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  serial.requestPort();
}

// open the selected port, and make the port
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
    serial.write("x");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

function serialEvent() {
  
  // read a string from the serial port
  // until you get carriage return and newline:
  
  let inString = serial.readStringUntil("\r\n");
  //let inString = serial.readLine();
  //console.log(inString);
  //check to see that there's actually a string there:
  if (inString) {
    
    //console.log(inString);

    // if inPreDebate == true; 
    // doPreDebate()



    // if you get hello, ignore it
    // split the string on the commas:
    let sensors = split(inString, ",");

    if (sensors.length == 7) {
      
      button1 = sensors[0]; // let btnFirstChoice
      button2 = sensors[1]; // btnSecondChoice
      button3 = sensors[2]; // btnNothing
      button4down = sensors[3]; // joystickdown
      button5left = sensors[4]; // joystickLeft
      button6up = sensors[5]; // joystickUp
      button7right = sensors [6]; // joystickRight

      // PRE-DEBATE 
      // In the first question
      // if you press  btnFirstChoice OR btnSecondChoice; you get <10> points
      // if you press btnNothing, you get <0> points
      // store data about which button was pressed for question one

      // In the second question
      // if you press btnFirstChoice OR btnSecondChoice; you lose <10> points
      // if you press btnNothing, you gain <10> points
      // store data about what button was pressed for question two

      // function initPreDebate() {
      //   // the buttons are defined

      //   // list of questions and answers
      //   // pseudoCode -- basically, define questions & answers
      //   // topicQuestion = {question: "do you like dogs?", answers: ['yes', 'no', 'maybe']}
      //   // predictionQuestion = {question: "which dog is best?", answers: ['fluffy', 'rover', 'all dogs']}
      //   // storedAnswers: {topicQuestion: 'yes', predictionQuestion: 'fluffy'}
      // }
      //

      // function initDebate() {
      //   // initialize teamA & teamB, 
      //   // let teamA, teamB; 
      //   // let teamAPoints = 0; 
      //   // let teamBPoints = 0;

      //   // during debate
      //   // if teamA is pressed, teamAPoints+=5 
      //   // if teamB is pressed, teamBPoints+=5 

      // }

      // initPreDebate()
      // doPreDebate() -- show user questions and capture their answers
      // initDebate()
      // doDebate() - show video; allow video manipulation; allow points for teamA/B
      // end() => display final scores; do something with the initial questions

      // DEBATE
      // There are two teams, teamA and teamB
      // Each start with 0 points
      // "points" are "positive reinforcement votes" from the viewer
      // there is no upper limit on number points allowed (for now)


      // Video Playback Behavior
      // if the user moves the joystick to the left, video goes backwards <by some amount of frames/speed>
      // if the user moves the joystick to the right, video goes forwards <by some amount of frames/speed>
      // TBD what happens when the joystick is moved "up" <play/pause?>

      // Scoring <use of buttons during the debate>
      // if you press btnFirstChoice, "team A" score increments by  <5> points
      // if you press btnSecondChoice, "team B" score increments by <5> points
      // if you press btnNothing, nothing happens
      // Nice to have: a visual counter for teamA and teamB that display the points

      // END OF DEBATE
      // totals for teamA and teamB are displayed on the screen
      // Maybe final prompt (yes/no/nothing): was your mind changed from watching the debate



      // In the second question
      if (button6up == 0 && trackButton6 == 1) {
        trackButton6 = 0;
      }
      //WHEN BUTTON IS RELEASED 
      if (button6up == 1 && trackButton6 == 0) {
        trackButton6 = 1;
        gameStateCounter = gameStateCounter + 1;
        if (gameStateCounter >= gameStates.length){
          gameStateCounter = 0;
        }

        gameState = gameStates[gameStateCounter];
        console.log("My new gameState is ", gameState);


        // if (gameState == "beginning") {
        //   gameState = "preDebate";
        // }

        //counter = counter +10;
      }
      //WHEN BUTTON ONE IS PRESSED
      if (button1 == 0 && trackButton1 == 1) {
        trackButton1 = 0;
      }
      //WHEN BUTTON IS RELEASED 
      if (button1 == 1 && trackButton1 == 0) {
        trackButton1 = 1;
        if(gameState == 'countDown'){
          counter = counter + 10;
          gameState = 'doPreDebate';
        }
        if(gameState == 'doPreDebate'){
          //do the thing minus 10 
          counter = counter - 10
        }
        // counter = counter + 10;
        if(gameState =='doDebate') {
        teamCounterA = teamCounterA + 5;
        gameState = 'doDebate';
      }
      }
      //console.log("button2", button2);
      // console.log("button3", button3);
      if (button2 == 0 && trackButton2 == 1) {
        //console.log ("a", counter);
        // if(gameState == 'doPreDebate')
        trackButton2 = 0;
      }

      if (button2 == 1 && trackButton2 == 0) {
        // alert(gameState);
        //console.log ("b", counter);
        trackButton2 = 1;
        if(gameState == 'countDown'){
          counter = counter + 10;
          gameState = 'doPreDebate';
        }
        if(gameState == 'doPreDebate'){
          counter = counter - 10;
        }
        if(gameState =='doDebate') {
        teamCounterB = teamCounterB + 5;
        gameState = 'doDebate';
        // counter = counter + 10;
      }

      if (button3 == 0 && trackButton3 == 1) {
        trackButton3 = 0;
      }

      if (button3 == 1 && trackButton3 == 0) {
        trackButton3 = 1;
        if(gameState == 'doPreDebate'){
          counter = counter + 10;
        }
        // counter = counter + 10;
      }
      if (button6up == 0 && trackButton6 == 1) {
        trackButton6 = 0;
      }
      if (button6up == 1 && trackButton6 ==0) {
        trackButton6 = 1;
      }

      //console.log(counter);

      // send a byte back to prompt for more data:
      serial.write("x");
    }

  }
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}

// try to connect if a new serial port
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}
}