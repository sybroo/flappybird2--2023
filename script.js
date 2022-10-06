var gravity, ball;
var gameState = 1;
var block;
let img;
var rects = [];
var addBlocks

function preload() {
  img = loadImage('menu.jpg');
}

class Ball {
  constructor(x, y, w, h, vy, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vy = vy;
    this.color = c;
  }

  drawBall() {
    fill(this.color)
    ellipse(this.x, this.y, this.w, this.h);


    this.vy += gravity;

    this.y += this.vy;
    if (this.y > 390) {
      this.vy = 0;
      this.y = 390;
    }

    if (this.y < 0) {
      this.vy = 0;
      this.y = 0;
    }
  }
}

class Block {
  constructor(x, y, h, c) {
    this.x = x;
    this.y = y;
    this.w = 60;
    this.h = h;
    this.vx = -6
    this.color = c;
  }

  drawBlock() {
    fill(this.color)
    this.x = this.x + this.vx;
    rect(this.x, this.y, this.w, this.h);
  }

  isColliding() {    
    if (ball.x + ball.w > this.x && ball.x < this.x + this.w)
      if (ball.y + ball.h > this.y && ball.y < this.y + this.h) {
        gameState = 0;
      }
  }
}

function setup() {
  createCanvas(700, 400);
  gravity = 0.25;
  ball = new Ball(250, 200, 20, 20, 0, "red");
}

function draw() {
  if (gameState == 0) {
    menu();
  }

  if (gameState == 1) {
    game();
  }

  if (gameState == 2) {
    gameover();
  }
}

function menu() {
  fill("black")
  image(img, 0, 0, width, height);
  text("PRESS ENTER TO PLAY", 240, 200)
  text("WELCOME!", 280, 100)
  text("MADE BY SYB", 280, 325)
  textSize(18);
}

function game() {
  background(225);
  ball.drawBall();

  if (frameCount % 50 == 0) {
    addBlocks();

    // remove pipes
    if (rects.length > 12) {
      rects.splice(0, 2);
    }
  }

  rects.forEach((block) => {
    block.drawBlock();
    block.isColliding();
  });
}



function gameover() {
  background('black')
  text("Press Esc to go to main menu", 150, 200)
  text("GAME OVER", 150, 100)
  text("gemaakt door Syb", 150, 325)

//   if (keycode = 27){
//     Reset();
//   gameState = 1;
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 32) {
    ball.vy = ball.vy - 5;
  }

  if (keyCode == 27) {
    gameState = 0;
  }
  if (keyCode == 13) {
    console.log("gameState != 1")
    gameState = 1;
    ball = new Ball(250, 200, 20, 20, 0, "red");
  }
}


function addBlocks() {

  let randHeight = random(height / 2);
  let gapHeight = 150;

  let newRectTop = new Block(640, 0, randHeight, "green");
  let newRectBot = new Block(640, randHeight + gapHeight, height + (randHeight + gapHeight), "green");

  rects.push(newRectBot);
  rects.push(newRectTop);
 }
