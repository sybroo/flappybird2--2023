
var gravity, ball;
var gameState = 0;
var block;
let img;
var rects = [];
var addBlocks
var score = 0;

function preload() {
  img = loadImage('foto/menu.jpg');
  buisUp = loadImage('foto/buis.webp');
  buisDown = loadImage('foto/buisdown.webp');
  mario = loadImage('foto/mario.png');
  dead = loadImage ('foto/dead.gif');
  stad = loadImage ('foto/city.gif');
  heehee = loadSound('music/hee-hee.mp3');
  jump = loadSound('music/springen.mp3');
  doodgeluid = loadSound('music/shutdown.mp3');
}

class Ball {
  constructor(img, x, y, w, h, vy,) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vy = vy;
    this.img = img
  }

  drawBall() {
    fill(0)
    image(this.img, this.x, this.y, this.w, this.h);

    this.vy += gravity;

    this.y += this.vy;
    if (this.y > 355) {
      this.vy = 0;
      this.y = 355;
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
        doodgeluid.play();
        heehee.stop();
      }
  }
}

function setup() {
  createCanvas(700, 400);
  gravity = 0.25;
  ball = new Ball(mario, 250, 200, 50, 50,0 );

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
  ball = new Ball(mario, 250, 200, 50, 50, 0);
  score = 0;
  }

function game() {
  background(stad,0,0)
  fill(225);
  text("Score: " + score, 10, 30);

  ball.drawBall();

  if (frameCount % 65 == 0) {
    addBlocks();

    // remove pipes
    if (rects.length > 12) {
      rects.splice(0, 2);
    }
  }
 if (frameCount % 65 == 0 && rects.length > 3) {
    score ++;
    heehee.play();
  }
  rects.forEach((block) => {
    block.drawBlock();
    block.isColliding();
  });
}





function gameOver() {
  background(dead,0,0)
  fill(0)
  text("Press Esc to go to menu", 30, 200) 
  text("GAME OVER", 150, 100)
  textSize(60)
  jump.stop(); 



   if(keyCode == 27){
   gameState = 0;
 }
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 32) {
    ball.vy = ball.vy - 5;
    jump.play();
  }

}


function addBlocks() {

  let randHeight = random(height / 2);
  let gapHeight = 150;

  let newRectTop = new Block(buisDown,740, 0, randHeight, "green");
  let newRectBot = new Block(buisUp,740, randHeight + gapHeight, height + (randHeight + gapHeight), "green");

  rects.push(newRectBot);
  rects.push(newRectTop);
 }
