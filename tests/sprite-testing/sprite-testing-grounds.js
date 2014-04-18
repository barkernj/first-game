// Create the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/sprite-background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// VARIABLES
var hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0,
    life: 20,
    attack: 5,
    defense: 0,
    money: 0
};

// Reset the game when the player catches a monster
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Update game objects -------------------------------------------------------------------------------------------------------------
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
        direction = 1;
    }
    if (87 in keysDown) { // Player holding |W|
        hero.y -= hero.speed * modifier;
        direction = 1;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
        direction = 2;
    }
    if (83 in keysDown) { // Player holding |S|
        hero.y += hero.speed * modifier;
        direction = 2;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
        direction = 4;
    }
    if (65 in keysDown) { // Player holding |A|
        hero.x -= hero.speed * modifier;
        direction = 4;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
        direction = 3;
    }
    if (68 in keysDown) { // Player holding |D|
        hero.x += hero.speed * modifier;
        direction = 3;
    }
    if (32 in keysDown) { // Player Presses |spacebar|
        swingSFX.play();
    }
    if (69 in keysDown) { // Player Presses |E|
        var run = function () {
            // Direction used to dash action (1 = up)(2= down)(3 = right)(4 = left)
            if (direction == 1) {
                hero.y = hero.y - 1;
            }
            if (direction == 2) {
                hero.y = hero.y + 1;
            }
            if (direction == 3) {
                hero.x = hero.x + 1;
            }
            if (direction == 4) {
                hero.x = hero.x - 1;
            }
        }
        run();
    }
    if (82 in keysDown) { // Player Presses |R|
        reset();
    }

    
    // Area where player cannot go


    // If player moves left offscreen
    if (hero.x <= -65) {
        hero.x = (500 + 64);
    }
    // If player moves right offscreen
    if (hero.x >= 565) {
        hero.x = (0 - 64);
    }
    // If player moves up offscreen
    if (hero.y <= -65) {
        hero.y = (500 + 64);
    }
    // If player moves down offscreen
    if (hero.y >= 565) {
        hero.y = (0 - 64);
    }
};

// Draw everything ---------------------------------------------------------------------------------------------------------------
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
