/*
* I will like to aknoledge  and attribute my
* references to the following resources in executing the project.
* 1. Arcade Game Walkthrough Blog by Matthew Cranford; Description
* 2. 'howler.js' audio library for the modern web, by goldfire.
*/

"use strict";

// Enemies the player must avoid.
const Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y+60;
  this.xMove = 101;
  this.speed = speed;
  this.initialPos = -this.xMove;
  this.edge = this.xMove * 5;

  // The image/sprite for the enemies.
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks.
Enemy.prototype.update = function(dt) {

  // If enemy is not passed boundary,move forward.
  if (this.x < this.edge) {

    // Increment x by speed * dt
    this.x += this.speed * dt;
  }
  // Reset position to start.
  else this.x = this.initialPos;
};

// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Main player class.
class PlayerMain {
  constructor() {
    this.sprite = "images/char-pink-girl.png";
    this.xMove = 101;
    this.yMove = 83;
    this.startX = this.xMove * 2;
    this.startY = (this.yMove * 4) + 60;
    this.x = this.startX;
    this.y = this.startY;
    this.win = false;
  }

  // Method to draw player at the current position.
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Method to handle keyboared inputs.
  handleInput(input) {
    if (input === "left" && this.x > 0) {
      this.x -= this.xMove;
    } else if (input === "up" && this.y > 0) {
      this.y -= this.yMove;
    } else if (input === "right" && this.x < this.xMove * 4) {
      this.x += this.xMove;
    } else if (input === "down" && this.y < this.yMove * 4) {
      this.y += this.yMove;
    }
  }

  // Method to update.
  update() {
    // Check collision with bugs.
    for (let enemy of allEnemies) {
      if (
        this.y === enemy.y &&
        (enemy.x + enemy.xMove / 2 > this.x &&
          enemy.x < this.x + this.xMove / 2)
      ) {
        collSound.play();
        this.reset();
      }

      // Check for win.
      if ((this.y+23) === 0) {
        this.win = true;
      }
    }
  }

  // Reset PlayerMain.
  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }
}

// Instantiate objects.
const player = new PlayerMain();

// Place all enemy objects in an array called allEnemies
const firstEnemy = new Enemy(-101, 0, 200);
const secondEnemy = new Enemy(-101, 83, 300);
const thirdEnemy = new Enemy((-101 * 3), 83, 300);
const fourthEnemy = new Enemy(-101, (83 * 2), 350);
const fithEnemy = new Enemy((-101 * 3), (83 * 2), 350);


const allEnemies = [];
allEnemies.push(firstEnemy, secondEnemy,thirdEnemy,fourthEnemy,fithEnemy);

// Backgrond sounds.
const bgdSound = new Howl({
    src: ['audio/sound1.webm', 'audio/sound1.mp3', 'audio/sound1.wav'], // Source - https://github.com/goldfire/howler.js.git
      autoplay: true,
    loop: true,
    volume: 0.4,
});


// Collision sounds.
const collSound = new Howl({
    src: ['audio/smash.mp3'],// source - http://soundbible.com/1945-Smashing.html
      volume: 0.4
});

// Win sounds.
const winSound = new Howl({
    src: ['audio/applause.mp3'],// source - http://soundbible.com/988-Applause.html
    volume: 0.5
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
