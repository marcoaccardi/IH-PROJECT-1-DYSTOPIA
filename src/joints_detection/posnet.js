let video;
let poseNet;
let poses = [];
let skeletons = [];
let triggerAreaOne = 0;
let triggerAreaTwo = 0;
let triggerAreaThree = 0;
let triggerAreaFour = 0;

// DECLARE VARIABLE AT THE BEGINNING
// in order to use them in
let leftX = 0;
let leftY = 0;

// let rightX = 0;
// let rightY = 0;

const posNetCanvas = sketch => {
  sketch.setup = () => {
    sketch.createCanvas(640, 480);

    // createCanvas(window.innerWidth, window.innerHeight);
    video = sketch.createCapture(sketch.VIDEO);
    video.size(sketch.width, sketch.height);

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
      //-----------------------------------------------------------//
      // LEFT WRIST: X-POSITION, Y-POSITION
      leftX = Math.abs(poses[0].pose.keypoints[9].position.x - 640) * 4.5;
      leftY = Math.abs(poses[0].pose.keypoints[9].position.y) * 4;
      // console.log("leftHandX: ", leftX);
      // console.log("leftHandY: ", leftY);
      //-----------------------------------------------------------//

      //----------------------------------------------------------
      // RIGHT WRIST: X-POSITION, Y-POSITION
      // rightX =
      //   Math.abs(poses[0].pose.keypoints[10].position.x - 640).toFixed(2) * 4.5;
      // rightY = Math.abs(poses[0].pose.keypoints[10].position.y).toFixed(2) * 4;
      // console.log("rightHandX: ", rightX);
      // console.log("rightHandY: ", rightY);
      //-----------------------------------------------------------//

      //----------------------DETECT CANVAS AREAS-------------------//
      // send the vaues to rms_anal to play sounds

      //AREA 1
      if (triggerAreaOne !== 1) {
        if (leftX > 260 && leftX < 660 && (leftY > 150 && leftY < 350)) {
          // console.log("triggerAreaOne 1");
          triggerAreaOne = 1;
          setTimeout(() => {
            // console.log("triggerAreaOne 0");
            triggerAreaOne = 0;
          }, 500);
        }
      }

      //AREA 2
      if (triggerAreaTwo !== 1) {
        if (leftX > 1700 && leftX < 2300 && (leftY > 150 && leftY < 350)) {
          // console.log("triggerAreaTwo 1");
          triggerAreaTwo = 1;
          setTimeout(() => {
            // console.log("triggerAreaTwo 0");
            triggerAreaTwo = 0;
          }, 500);
        }
      }

      //AREA 3
      if (triggerAreaThree !== 1) {
        if (leftX > 260 && leftX < 660 && (leftY > 800 && leftY < 1200)) {
          // console.log("triggerAreaThree 1");
          triggerAreaThree = 1;
          setTimeout(() => {
            // console.log("triggerAreaThree 0");
            triggerAreaThree = 0;
          }, 500);
        }
      }

      //AREA 4
      if (triggerAreaFour !== 1) {
        if (leftX > 1700 && leftX < 2300 && (leftY > 800 && leftY < 1200)) {
          // console.log("triggerAreaFour 1");
          triggerAreaFour = 1;
          setTimeout(() => {
            // console.log("triggerAreaFour 0");
            triggerAreaFour = 0;
          }, 500);
        }
      }

      // console.log(trigger);
      // console.log(leftX);

      //-----------------------------------------------------------//
    });
    // Hide the video element, and just show the canvas
    video.hide();
  };

  modelReady = () => {
    // select("#status").html("Model Loaded");
  };

  sketch.draw = () => {
    // image(video, 0, 0, width, height);
    // We can call both functions to draw all keypoints and the skeletons
    // drawKeypoints();
    // DON'T NEED drawSkeleton
    // drawSkeleton();
  };

  sketch.drawKeypoints = () => {
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
            sketch.fill(0, 255, 0);
            sketch.noStroke();
            sketch.ellipse(keypoint.position.x, keypoint.position.y, 15, 10);
          }
          //RIGHT WRIST >>> RED
          if (keypoint == poses[0].pose.keypoints[10]) {
            sketch.fill(255, 0, 0);
            sketch.noStroke();
            sketch.ellipse(keypoint.position.x, keypoint.position.y, 15, 10);
          }
        }
      }
    }
  };
};

// function modelReady() {
//   // select("#status").html("Model Loaded");
// }

// A function to draw ellipses over the detected keypoints
// function drawKeypoints() {
//   // Loop through all the poses detected
//   for (let i = 0; i < poses.length; i++) {
//     // For each pose detected, loop through all the keypoints
//     for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
//       // A keypoint is an object describing a body part (like rightArm or leftShoulder)
//       let keypoint = poses[i].pose.keypoints[j];
//       // Only draw an ellipse is the pose probability is bigger than 0.2
//       if (keypoint.score > 0.2) {
//         // fill(255, 0, 0);
//         // noStroke();
//         // ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

//         //LEFT WRIST >>> GREEN
//         if (keypoint == poses[0].pose.keypoints[9]) {
//           fill(0, 255, 0);
//           noStroke();
//           ellipse(keypoint.position.x, keypoint.position.y, 15, 10);
//         }
//         //RIGHT WRIST >>> RED
//         if (keypoint == poses[0].pose.keypoints[10]) {
//           fill(255, 0, 0);
//           noStroke();
//           ellipse(keypoint.position.x, keypoint.position.y, 15, 10);
//         }
//       }
//     }
//   }
// }
