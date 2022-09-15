var gravity, ball;
var gameState = 1;
var block;
let img;

function preload() {
  img = loadImage('menu.jpg');
}

class Ball {
  constructor(x, y, w, h, vy, c) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.vy = vy;
    this.color = c;
  }

  drawBall() {
    fill(this.color)
    ellipse(this.x, this.y, this.width, this.height);


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
  constructor(x, y, w, h, vx, c) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.vx = vx;
    this.color = c;
  }

  drawBlock() {
    fill(this.color)
    rect(this.x, this.y, this.width, this.height);
  }
}

function setup() {
  createCanvas(700, 400);
  gravity = 0.25;
  ball = new Ball(250, 200, 20, 20, 0, "red");
  block = new Block(200,380,300,400,0,"orange")
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
  block.drawBlock();
}

function gameover() {
  background('black')
  text("Press Esc to go to main menu", 150, 200)
  text("GAME OVER", 150, 100)
  text("gemaakt door Syb", 150, 325)
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
    if (gameState != 1) {
      ball = new Ball(250, 200, 20, 20, 0);
      gameState = 1;
      block = new Block(200,400,300,400,0)
    }
  }
}