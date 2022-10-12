
var gravity, ball;
var gameState = 0;
var block;
let img;
var rects = [];
var addBlocks

function preload() {
  img = loadImage('foto/menu.jpg');
  penisUp = loadImage('foto/penisUp.png');
  penisDown = loadImage('foto/penisDown.png');
  mario = loadImage('foto/mario.png');
  dead = loadImage ('foto/dead.gif')
}

class Ball {
  constructor(x, y, w, h, vy,) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vy = vy;

  }

  drawBall() {
    fill(0)
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
  constructor(img , x , y , h, c) {
    this.x = x;
    this.y = y;
    this.w = 60;
    this.h = h;
    this.vx = -6
    this.color = c;
    this.img = img;
  }
  
  drawBlock() {
    this.x = this.x + this.vx;
    image(this.img, this.x, this.y, this.w, this.h);
  }

  isColliding() {    
    if (ball.x + ball.w > this.x && ball.x < this.x + this.w)
      if (ball.y + ball.h > this.y && ball.y < this.y + this.h) {
        gameState = 2;
      }
  }
}

function setup() {
  createCanvas(700, 400);
  gravity = 0.25;
  ball = new Ball(250, 200, 20, 20, 0,);

}

function draw() {
  if (gameState == 0) {
    menu();
  }

  if (gameState == 1) {
    game();
  }

  if (gameState == 2) {
    gameOver();
  }
}


function menu() {
  fill("black")
  image(img, 0, 0, width, height);
  text("PRESS ENTER TO PLAY", 240, 200)
  text("WELCOME!", 280, 100)
  text("MADE BY SYB", 280, 325)
  textSize(18);

  if (keyCode == 13) {
    reset()
    gameState = 1;
 }
}
  
  function reset(){
  gamestate = 0;
  rects = [];
  ball = new Ball(250, 200, 20, 20, 0,);
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





function gameOver() {
  background(dead, 0, 0)
  fill(0)
  text("Press Esc to go to menu", 30, 200) 
  text("GAME OVER", 150, 100)
  textSize(60)
   



   if(keyCode == 27){
   gameState = 0;
 }
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 32) {
    ball.vy = ball.vy - 5;
  }

}


function addBlocks() {

  let randHeight = random(height / 2);
  let gapHeight = 150;

  let newRectTop = new Block(penisDown,740, 0, randHeight, "green");
  let newRectBot = new Block(penisUp,740, randHeight + gapHeight, height + (randHeight + gapHeight), "green");

  rects.push(newRectBot);
  rects.push(newRectTop);
 }
