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
// Two dimensional array to represent container area
var containers =
[
    [red, red, red, red, red]
];
// Two dimensional array to represent the droplet area
var droplets =
[
    [red, purple, green, purple, blue],
    [orange, green, red, red, green],
    [red, blue, orange, purple, green],
    [purple, orange, orange, blue, blue],
    [, , , , ]
];
// Droplet Switching Variables
var firstClick = true;
var firstClickX = 0;
var firstClickY = 0;
var temp = " ";
var temp2 = " ";

// Draw the color containers at bottom on page
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
                ctx.lineWidth = "10";
                ctx.strokeStyle = white;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.stroke();
                //ctx.lineWidth = 10;
                //ctx.strokeStyle = white;
                ctx.beginPath();
                ctx.arc((j + 1) * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.stroke();
                //ctx.lineWidth = 10;
                //ctx.strokeStyle = white;
                ctx.beginPath();
                ctx.arc((j - 1) * 100 + 50, i * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.stroke();
                //ctx.lineWidth = 6;
                //ctx.strokeStyle = white;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, (i + 1) * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.stroke();
                //ctx.lineWidth = 10;
                //ctx.strokeStyle = white;
                ctx.beginPath();
                ctx.arc(j * 100 + 50, (i - 1) * 100 + 50, dropRadius, 0, Math.PI * 2, true);
                ctx.stroke();
            }
        }

    }
    ////clicks++;

    // Draw the containers
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
}


// Clear Canvas Function
function clear() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);    
}


// Initial Canvas Draw
draw();