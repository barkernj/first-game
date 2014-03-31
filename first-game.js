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
    + Added background track
    + Added SFX for action |spacebar|
    + Added run action |E|
    + Added 800x600 sand background BETTER
    + Added reset action |R|
    + Added Scorpion Monster
*/

/*  CHANGES TO MAKE

    - Add sprites for Hero
    - Add sprites for Monster
    - Make Monster Chase Hero
    - Add area where player cannot go (like a building was there)
    - Add a timer at top right of Canvas
    - Responsive Windows?
    - Add sfx for hitting wall
    - Add Reset Game to |R| key
*/

/* LOADING SCREEN
    setTimeout(function() {
    //after loaded game assests
    document.getElementById("loader").style.top="-720px";
}, 1000) */

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background-sand-800x600-better.png";

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
};
powerImage.src = "images/power-up.png";

// Scorpion images
var scorpionReady = false;
var scorpionImage = new Image();
scorpionImage.onload = function () {
    scorpionReady = true;
};
scorpionImage.src = "images/scorpion-up.png";

// Game objects --------------------------------------------------------------------------------------------------------------------
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
var scorpion = {
    speed: 0,
    x: 0,
    y: 0
}
var monstersCaught = 0;
var powerNum = 0;
var power = {
    x: -64,
    y: -64
};
var timeLeft = 10;
var swingSFX = new Audio("/audio/sfx/action-sound.mp3");
var track01 = new Audio("/audio/track/luf1cave.mp3");
var track02 = new Audio("/audio/track/Gyro-Dungeon003.mp3");
//track01.play();
track02.play();
var direction = 0;

/*var timeElapse = function () {
    	setInterval(timeDecrement,1000);
    };*/

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
    //window.alert("GAME OVER MAN, GAME OVER!");
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));

    // Throw the scorpion monster somewhere on the screen randomly
    scorpion.x = 32 + (Math.random() * (canvas.width - 64));
    scorpion.y = 32 + (Math.random() * (canvas.height - 64));

    timeLeft = 10;
    timer();
};

//Timer (When it runs out the game is over)
    var counter = setInterval(timer, 1000); // 1000 will run every 1 second
    function timer() {
        timeLeft = timeLeft - 1;
        if (timeLeft <= 0) {
            clearInterval(counter);
            reset();
            return;
        }
    }

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
        ++powerNum;
    }

    // Monster Chases Hero
    if (monster.x < hero.x) {
        monster.x = monster.x + 0.5;
    }
    if (monster.y < hero.y) {
        monster.y = monster.y + 0.5;
    }
    if (monster.x > hero.x) {
        monster.x = monster.x - 0.5;
    }
    if (monster.y > hero.y) {
        monster.y = monster.y - 0.5;
    }

    // Scorpion Faces Hero
    if (scorpion.x < hero.x) {
        scorpionImage.src = "/images/scorpion-right.png";
    }
    if (scorpion.y < hero.y) {
        scorpionImage.src = "/images/scorpion-down.png";
    }
    if (scorpion.x > hero.x) {
        scorpionImage.src = "/images/scorpion-left.png";
    }
    if (scorpion.y > hero.y) {
        scorpionImage.src = "/images/scorpion-up.png";
    }

    // Area where player cannot go


    // If player moves left offscreen
    if (hero.x <= -33) {
        hero.x = (800 + 32);
    }
    // If player moves right offscreen
    if (hero.x >= 833) {
        hero.x = (0 - 32);
    }
    // If player moves up offscreen
    if (hero.y <= -33) {
        hero.y = (600 + 32);
    }
    // If player moves down offscreen
    if (hero.y >= 633) {
        hero.y = (0 - 32);
    }
        
    /* var timeDecrement = function (timeLeft) {
    var startTime = Date.now();
    return function () {
    return timeLeft - (Date.now() - startTime);
    };
    }; */

};

// Draw everything ---------------------------------------------------------------------------------------------------------------
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
    if (scorpionReady) {
        ctx.drawImage(scorpionImage, scorpion.x, scorpion.y);
    }

    // Score
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins Captured: " + monstersCaught, 0, 0);

    //Timer
    ctx.fillText("Timer: " + (timeLeft), 690, 0);
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

