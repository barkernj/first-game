// Main Menu Script test by Jay Barker

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var width = canvas.getAttribute('width');
var height = canvas.getAttribute('height');
	
var mouseX;
var mouseY;

	
var bgImage = new Image();
var logoImage = new Image();
var playImage = new Image();
var instructImage = new Image();
var settingsImage = new Image();
var creditsImage = new Image();
var swordImage = new Image();

var backgroundY = 0;
var speed = 1;
	
var buttonX = [354,271,314,325];
var buttonY = [191,253,223,287];
var buttonWidth = [96,260,182,160];
var buttonHeight = [40,40,40,40];
	
var swordX = [0,0];
var swordY = [0,0];
var swordWidth = 35;
var swordHeight = 40;
	
var swordVisible = false;
var swordSize = swordWidth;
var swordRotate = 0;
	
var frames = 30;
var timerId = 0;
var fadeId = 0;
var time = 0.0;


var theme = new Audio("audio/dragon-title-screen.mp3");

swordImage.src = "images/sword.png";
bgImage.onload = function(){
	context.drawImage(bgImage, 0, backgroundY);
};
bgImage.src = "images/dragon-title.png";
logoImage.onload = function(){
	context.drawImage(logoImage, 50, -10);
}
logoImage.src = "images/logo.png";
playImage.onload = function(){
	context.drawImage(playImage, buttonX[0], buttonY[0]);
}
playImage.src = "images/play.png";
instructImage.onload = function(){
	context.drawImage(instructImage, buttonX[1], buttonY[1]);
}
instructImage.src = "images/instructions.png";
settingsImage.onload = function(){
	context.drawImage(settingsImage, buttonX[2], buttonY[2]);
}
settingsImage.src = "images/settings.png";
creditsImage.onload = function(){
	context.drawImage(creditsImage, buttonX[3], buttonY[3]);
}
creditsImage.src = "images/credits.png";

timerId = setInterval("update()", 1000/frames);

canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);

function update() {
	clear();
	move();
	draw();
}
function clear() {
	context.clearRect(0, 0, width, height);
}
function move(){
	/* backgroundY -= speed;
	if(backgroundY == -1 * height){
		backgroundY = 0;
	} */
	if(swordSize == swordWidth){
		swordRotate = -1;
	}
	if(swordSize == 0){
		swordRotate = 1;
	}
	swordSize += swordRotate;
}
function draw(){
	context.drawImage(bgImage, 0, backgroundY);
	context.drawImage(logoImage, 50,-10);
	context.drawImage(playImage, buttonX[0], buttonY[0]);
	context.drawImage(instructImage, buttonX[1], buttonY[1]);
	context.drawImage(settingsImage, buttonX[2], buttonY[2]);
	context.drawImage(creditsImage, buttonX[3], buttonY[3]);
	if(swordVisible == true){
		context.drawImage(swordImage, swordX[0] - (swordSize/2), swordY[0], swordSize, swordHeight);
		context.drawImage(swordImage, swordX[1] - (swordSize/2), swordY[1], swordSize, swordHeight);
	}
}
function checkPos(mouseEvent){
	if(mouseEvent.pageX || mouseEvent.pageY == 0){
		mouseX = mouseEvent.pageX - this.offsetLeft;
		mouseY = mouseEvent.pageY - this.offsetTop;
	}else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
		mouseX = mouseEvent.offsetX;
		mouseY = mouseEvent.offsetY;
	}
	for(i = 0; i < buttonX.length; i++){
		if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
			if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
				swordVisible = true;
				swordX[0] = buttonX[i] - (swordWidth/2) - 2;
				swordY[0] = buttonY[i] + 2;
				swordX[1] = buttonX[i] + buttonWidth[i] + (swordWidth/2); 
				swordY[1] = buttonY[i] + 2;
			}
		}else{
			swordVisible = false;
		}
	}
}
function checkClick(mouseEvent){
	for(i = 0; i < buttonX.length; i++){
		if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
			if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
				fadeId = setInterval("fadeOut()", 1000/frames);
				clearInterval(timerId);
				canvas.removeEventListener("mousemove", checkPos);
				canvas.removeEventListener("mouseup", checkClick);
			}
		}
	}
}
function fadeOut(){
	context.fillStyle = "rgba(0,0,0, 0.2)";
	context.fillRect (0, 0, width, height);
	time += 0.1;
	if(time >= 2){
		clearInterval(fadeId);
		time = 0;
		timerId = setInterval("update()", 1000/frames);
		canvas.addEventListener("mousemove", checkPos);
		canvas.addEventListener("mouseup", checkClick);
	}
}

theme.play();