// Drawing Shapes with Canvas test by Jay Barker


// Setup the Canvas variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");

////var clicks = 0;
var xClick = 0;
var yClick = 0;
// Containers
var sideMargin = 55;
var centerPadding = 30;
var containerWidth = 100;
var containerHeight = 100;
var containerTop = 500;
// Drops
var dropRadius = 25;
// Colors
var purple = "#8B008B";
var green = "#5FCF80";
var red = "#FF0000";
var orange = "#FF8C00";
var blue = "#00C8FB";
var white = "ffffff";
var black = "000000";
var testOpacity = "rgba(255, 140, 000, 0.5)";
// Two dimensional array to represent the droplet area
var droplets =
[
    [green, purple, orange, blue, red],
    [, , , , ],
    [, , , , ],
    [, , , , ],
    [, , , , ]
];
// Droplet Switching Variables
var firstClick = true;
var firstClickX = 0;
var firstClickY = 0;
var temp = " ";
var temp2 = " ";
// TIMER
var time = 10;
// SCORE
var playerScore = 0;
var fontStyle = "16px Helvetica";
/* Two dimensional array to represent container area
var containers =
[
    [red, red, red, red, red]
]; */


/* // Draw the color containers at bottom on page
ctx.fillStyle = purple;
ctx.fillRect(0, containerTop, containerWidth, containerHeight);

ctx.fillStyle = green;
ctx.fillRect(100, containerTop, containerWidth, containerHeight);

ctx.fillStyle = red;
ctx.fillRect(200, containerTop, containerWidth, containerHeight);

ctx.fillStyle = orange;
ctx.fillRect(300, containerTop, containerWidth, containerHeight);

ctx.fillStyle = blue;
ctx.fillRect(400, containerTop, containerWidth, containerHeight); */


// Attach a mouse click event listener for switching droplet colors
$("#myCanvas").click(function (e) {

    //e will give us absolute x, y so we need to calculate relative to canvas
    var pos = $("#myCanvas").position();
    var ox = e.pageX - pos.left;
    var oy = e.pageY - pos.top;

    // 100 = width of the tile
    var xField = Math.floor(oy / 100);
    var yField = Math.floor(ox / 100);

    xClick = xField;
    yClick = yField;

    if (firstClick == true) {
        temp = droplets[xField][yField];
        firstClickX = xField;
        firstClickY = yField;
        firstClick = false;
    } else if (firstClick == false && xField == firstClickX + 1 && yField == firstClickY) {
        temp2 = droplets[xField][yField];
        droplets[xField][yField] = temp;
        droplets[firstClickX][firstClickY] = temp2;
        firstClick = true;
    } else if (firstClick == false && xField == firstClickX - 1 && yField == firstClickY) {
        temp2 = droplets[xField][yField];
        droplets[xField][yField] = temp;
        droplets[firstClickX][firstClickY] = temp2;
        firstClick = true;
    } else if (firstClick == false && yField == firstClickY + 1 && xField == firstClickX) {
        temp2 = droplets[xField][yField];
        droplets[xField][yField] = temp;
        droplets[firstClickX][firstClickY] = temp2;
        firstClick = true;
    } else if (firstClick == false && yField == firstClickY - 1 && xField == firstClickX) {
        temp2 = droplets[xField][yField];
        droplets[xField][yField] = temp;
        droplets[firstClickX][firstClickY] = temp2;
        firstClick = true;
    } else {
        firstClick = false;
    }
    draw();
});


// Create/Update the fields
function draw() {

    // Clear Canvas
    clear();

    for (var i = 0; i < droplets.length; i++) { // Rows
        for (var j = 0; j < droplets[i].length; j++) { // Columns

            /* // Draw droplet test
            // Setup the brush
            ctx.lineWidth = 2;
            ctx.strokeStyle = black;
            // Start Drawing
            ctx.beginPath();
            // arc ( x, y, radius, startAngle, endAngle, anticlockwise )
            ctx.arc(j * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
            // Actual draw of the border
            ctx.stroke(); */


            // Check which color to fill the droplet
            if (droplets[i][j] == red) {
                ctx.fillStyle = red;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.fill();
            } else if (droplets[i][j] == purple) {
                ctx.fillStyle = purple;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.fill();
            } else if (droplets[i][j] == blue) {
                ctx.fillStyle = blue;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.fill();
            } else if (droplets[i][j] == green) {
                ctx.fillStyle = green;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.fill();
            } else if (droplets[i][j] == orange) {
                ctx.fillStyle = orange;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.fill();
            }

            // Check if droplet is first click
            if (i == xClick && j == yClick && firstClick == false) {
                ctx.lineWidth = "5";
                ctx.strokeStyle = white;
                //ctx.shadowColor = white;
                //ctx.shadowOffsetX = 0;
                //ctx.shadowOffsetY = 0;
                //ctx.shadowBlur    = 15;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.stroke();
                ctx.lineWidth = "5";
                ctx.strokeStyle = white;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, (i - 1) * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.stroke();
                ctx.lineWidth = "5";
                ctx.strokeStyle = white;
                ctx.beginPath();
                ctx.arc((j + 1) * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.stroke();
                ctx.lineWidth = "5";
                ctx.strokeStyle = white;
                ctx.beginPath();
                ctx.arc((j - 1) * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.stroke();
                ctx.lineWidth = "5";
                ctx.strokeStyle = white;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, (i + 1) * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.stroke();
                }
        }

    }
    ////clicks++;

    // Draw the containers with gradients

    /*var myGradient = ctx.createLinearGradient(0, 0, 170, 0);
    myGradient.addColorStop(0, purple);
    myGradient.addColorStop(1, "white"); */
    ctx.fillStyle = purple;
    ctx.fillRect(0, containerTop, containerWidth, containerHeight);

    ctx.fillStyle = green;
    ctx.fillRect(100, containerTop, containerWidth, containerHeight);
        
    ctx.fillStyle = red;
    ctx.fillRect(200, containerTop, containerWidth, containerHeight);
        
    ctx.fillStyle = orange;
    ctx.fillRect(300, containerTop, containerWidth, containerHeight);

    ctx.fillStyle = blue;
    ctx.fillRect(400, containerTop, containerWidth, containerHeight);

    // Display Timer & Score
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = fontStyle;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Timer: " + (time), 25, 0);
    ctx.fillText("Score: " + (playerScore), 400, 0);
}


// TIMER FUNCTION
var myVar=setInterval(function(){myTimer()},1000);

function myTimer() {
    if (time > 1) {
        time = time - 1;
    } else if (time == 1){
        time = 10; 
        scored();   
    }
}


// SCORE FUNCTION (Check to see if score should be increased)
function scored() {
    if (droplets[4][0] == purple) {
        playerScore = playerScore + 100;
    }
    if (droplets[4][1] == green) {
        playerScore = playerScore + 100;
    }
    if (droplets[4][2] == red) {
        playerScore = playerScore + 100;
    }
    if (droplets[4][3] == orange) {
        playerScore = playerScore + 100;
    }
    if (droplets[4][4] == blue) {
        playerScore = (playerScore + 100);
    }
    moveBoard();
}


// Move array elements along their respective 'column' and randomly populate top row
function moveBoard() {
    for (var i = droplets.length - 1; i >= 0; --i) {
        for (var j = droplets[i].length - 1; j >= 0; --j) {
            if (i < 4) {
                droplets[i + 1][j] = droplets[i][j];
                if (i == 0) {
                    var randomColor = " ";
                    randomColor = Math.floor(Math.random() * 5) + 1;
                    if (randomColor == 1){
                        randomColor = blue;
                    } else if (randomColor == 2) {
                        randomColor = red;
                    } else if (randomColor == 3) {
                        randomColor = orange;
                    } else if (randomColor == 4) {
                        randomColor = purple;
                    } else if (randomColor == 5) {
                        randomColor = green;
                    }
                    droplets[i][j] = randomColor;
                }
            }
        }
    }
}


// Clear Canvas Function
function clear() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);    
}


// Initial Canvas Draw
//draw();


// Update Function
var update = function (modifier) { 

};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	draw();

	then = now;
};

// Let's play this game!
clear();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible