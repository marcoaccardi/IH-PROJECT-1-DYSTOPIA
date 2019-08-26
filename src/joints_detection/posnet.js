let video;
let poseNet;
let poses = [];
let skeletons = [];
let trigger = 0;

// DECLARE VARIABLE AT THE BEGINNING
let leftX = 0;
let leftY = 0;

// let rightX = 0;
// let rightY = 0;

function setup() {
  createCanvas(640, 480);
  // createCanvas(window.innerWidth, window.innerHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  //NEW DESIGN 
  // stroke(255);
  // noFill();
  //

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function(results) {
    poses = results;
    if (!results.length) {
      return;
    }
    // console.log(poses[0].pose.keypoints[9]);
    // console.log(poses[0].pose.keypoints[10]);
    // console.log(poses[0].pose.keypoints[9].position.x);
    // console.log(poses[0].pose.keypoints[9].position.y);

    //-----------------------------------------------------------//
    // LEFT WRIST: X-POSITION, Y-POSITION
    leftX =
      Math.abs(poses[0].pose.keypoints[9].position.x - 640) * 4.5;
    leftY = Math.abs(poses[0].pose.keypoints[9].position.y) * 4;
    // console.log("leftHandX: ", leftX);
    // console.log("leftHandY: ", leftY);
    //-----------------------------------------------------------//
    // RIGHT WRIST: X-POSITION, Y-POSITION
    // rightX =
    //   Math.abs(poses[0].pose.keypoints[10].position.x - 640).toFixed(2) * 4.5;
    // rightY = Math.abs(poses[0].pose.keypoints[10].position.y).toFixed(2) * 4;
    // console.log("rightHandX: ", rightX);
    // console.log("rightHandY: ", rightY);
    //-----------------------------------------------------------//

    //-----------------------------------------------------------//
    // CSS STYLING //

    // let colorOne = leftX/4.5;
    // let backGroundEl = document.querySelector("#particles-js");

    // console.log(colorOne);

    // backGroundEl.style.backgroundColor = `rgb(${colorOne}, ${colorOne}, 0)`;

    //---------------------------------------------------------//

    //----------------------DETECT CANVAS AREAS-------------------//

    if (trigger !== 1) {
      if (leftX > 0 && leftX < 600) {
        console.log("called");
        trigger = 1;
        setTimeout(() => {
          console.log("changed");
          trigger = 0;
        }, 10000);
      } 
    }

   
    // console.log(trigger);
    // console.log(leftX);

    //-----------------------------------------------------------//
  });
  // Hide the video element, and just show the canvas
  video.hide();
}
function modelReady() {
  // select("#status").html("Model Loaded");
}
function draw() {
  // image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons

  // drawKeypoints();
  // DON'T NEED drawSkeleton
  // drawSkeleton();


// NEW DESIGN
  // background(0);
  // for (let i = 0; i < 200; i += 20) {
  //   bezier(
  //     mouseX - i / 2.0,
  //     40 + i,
  //     410,
  //     20,
  //     440,
  //     300,
  //     240 - i / 16.0,
  //     300 + i / 8.0
  //   );
  // }

  //
}
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        // fill(255, 0, 0);
        // noStroke();
        // ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

        //LEFT WRIST >>> GREEN
        if (keypoint == poses[0].pose.keypoints[9]) {
          fill(0, 255, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 15, 10);
        }
        //RIGHT WRIST >>> RED
        if (keypoint == poses[0].pose.keypoints[10]) {
          fill(255, 0, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 15, 10);
        }
      }
    }
  }
}

// A function to draw the skeletons
// function drawSkeleton() {
//   // Loop through all the skeletons detected
//   for (let i = 0; i < poses.length; i++) {
//     // For every skeleton, loop through all body connections
//     for (let j = 0; j < poses[i].skeleton.length; j++) {
//       let partA = poses[i].skeleton[j][0];
//       let partB = poses[i].skeleton[j][1];
//       stroke(255, 0, 0);
//       line(
//         partA.position.x,
//         partA.position.y,
//         partB.position.x,
//         partB.position.y
//       );
//     }
//   }
// }
