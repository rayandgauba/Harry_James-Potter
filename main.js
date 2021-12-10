var song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    Harry_Potter = loadSound("Harry Potter Theme Song.mp3");
    song_pp = loadSound("Peter Pan Theme Song.mp3");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.position(450,160);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initilized!")
}

function gotPoses(results) {
    if(results.length>0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX);
        console.log("Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.leftWrist.y;
        console.log("Right Wrist X = " + rightWristX);
        console.log("Right Wrist Y = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Of left wrist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Of right wrist = " + scoreRightWrist);
}
 }

function draw() {
    image(video,0,0,400,400);

    status_pp = song_pp.isPlaying();

    fill("#ff0000");
    stroke("#ff0000");

   if (scoreLefttWrist > 0.2) {
    circle(leftWristX,leftWristY,20);
    Harry_Potter.stop();

    if (status_pp == false) {
        song_pp.play();

        document.getElementById("songName").innerHTML = "Peter Pan Theme Song"
    }

   }
   

   status_HarryPotter = Harry_Potter.isPlaying();


   if (scoreRighttWrist > 0.2) {
    circle(rightWristX,rightWristY,20);
    song_pp.stop();

    if (status_HarryPotter == false) {
        Harry_Potter.play();

        document.getElementById("songName").innerHTML = "Harry Potter Theme Song /*"
    }

   }

}