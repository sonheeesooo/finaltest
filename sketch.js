// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


let video;
let poseNet;
let poses = [];

let bg1;
let bg2;

function setup() {
  // 캔버스의 크기 : 여기서 480의 절반인 240아래로 어깨가 내려가면, 넘어짐 감지 화면 뜨도록
  bg1 = loadImage('wait.png'); 
  bg2 = loadImage('fall.png');
  createCanvas(800, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  //image(video, 0, 0, width, height);
  image(bg1, 0, 0, 800, 480);

  // We can call both functions to draw all keypoints and the skeletons
  Fall_detection();

}


function Fall_detection() {
  for (let i = 0; i < poses.length; i++) {
    // 넘어짐 감지_양쪽 어깨의 위치 가져오기
    let rs_x = poses[i].pose["rightShoulder"].x;
    let rs_y = poses[i].pose["rightShoulder"].y;
    let ls_x = poses[i].pose["leftShoulder"].x;
    let ls_y = poses[i].pose["leftShoulder"].y;
    //let pose1 = poses[0].pose.leftShoulder;
    //let pose2 = poses[1].pose.rightShoulder;
    
    // 양쪽 어깨 모두 캔버스의 절반(y값이 240이하일 경우 
    if(rs_y > 240 && ls_y > 240){
      image(bg2, 0, 0, 800, 480); 

    }
  }
}


