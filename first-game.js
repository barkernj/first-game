/* My first game tutorial by Jay Barker and Wes Turner */

/*  CHANGES

    + Added 1280x720 sand background
    + Added if player moves past left border of screen
    + Added if player move past right border of screen
    + Added if player move past top border of screen
    + Added if player move past bottom border of screen
    + Changed "Goblins Caught" display color to black
    + Changed "Goblins Caught" display position to (0,0)
    + Add controls to buttons |W| |A| |S| |D|
    + Added A Speed Power-Up @ 5 Goblins Caught
    + Added Power-Up = Hero's speed (x1.5)
    + Added Spacebar Action Keystroke
    + Added Power-Up = Hero PNG changes
*/

/*  CHANGES TO MAKE

    - Add sprites for Hero
    - Add sprites for Monster
    - Make Monster Chase Hero
    - Add area where player cannot go (like a building was there)
    - Add a timer at top right of Canvas
    - Add background track
    - Add Buffered Audio and SFX for action keystroke
    - Responsive Windows?
*/

/* LOADING SCREEN
    setTimeout(function() {
    //after loaded game assests
    document.getElementById("loader").style.top="-720px";
}, 1000) */

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background-sand-720p.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Power-up image
var powerReady = false;
var powerImage = new Image();
powerImage.onload = function () {
    powerReady = true;
}
powerImage.src = "images/power-up.png";

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};
var monster = {
    speed: 0,
	x: 0,
	y: 0
};
var monstersCaught = 0;
var powerNum = 0;
var power = {
    x: -64,
    y: -64
};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (87 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (83 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (65 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }
    if (68 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }

    // Are the Hero & Monter touching?
    if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
        && (32 in keysDown)
	) {
        ++monstersCaught;
        monster.x = 32 + (Math.random() * (canvas.width - 64));
        monster.y = 32 + (Math.random() * (canvas.height - 64));
        //reset();
    }

    // Are the Hero & Power-up touching?
    if (
		hero.x <= (power.x + 32)
		&& power.x <= (hero.x + 32)
		&& hero.y <= (power.y + 32)
		&& power.y <= (hero.y + 32)
	) {
        hero.speed = (256 * 1.5);
        power.x = -64;
        power.y = -64;
        heroImage.src = "images/hero-power.png";
    }

    // Speed Power-up at 5 Goblins Caught
    if (monstersCaught == 5
        && powerNum == 0
    ) {
        power.x = 32 + (Math.random() * (canvas.width - 64));
        power.y = 32 + (Math.random() * (canvas.height - 64));
        ++powerNum
    }

    // Area where player cannot go


    // If player moves left offscreen
    if (hero.x <= -33) {
        hero.x = (1280 + 32);
    }
    // If player moves right offscreen
    if (hero.x >= 1313) {
        hero.x = (0 - 32);
    }
    // If player moves up offscreen
    if (hero.y <= -33) {
        hero.y = (720 + 32);
    }
    // If player moves down offscreen
    if (hero.y >= 753) {
        hero.y = (0 - 32);
    }
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    if (powerReady) {
        ctx.drawImage(powerImage, power.x, power.y);
    }

    // Score
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins Captured: " + monstersCaught, 0, 0);
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

