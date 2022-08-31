var gravity, Ball1;
var gameState = 1;

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
      if (this.y < 390) {
        this.y = this.y + this.vy;
      }

    }
  }

  function setup() {
    createCanvas(700, 400);
    gravity = 0.25;
    Ball1 = new Ball(250, 200, 20, 20, 0, "red");
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
    image(img,0, 0, width, height);
    text("PRESS ENTER TO PLAY", 240, 200)
    text("WELCOME!", 280, 100)
    text("MADE BY SYB", 280, 325)
    textSize(18);
  }
  function game() {
    background(225);
    Ball1.drawBall();
  }

  function gameover() {
    background('black')
    text("Press Esc to go to main menu", 150, 200)
    text("GAME OVER", 150, 100)
    text("gemaakt door Syb", 150, 325)
  }


  function keyPressed() {
    (keyCode);
    if (keyCode == 32) {
      Ball1.vy = Ball1.vy - 5;
    }

    if (keyCode == 27) {
      gameState = 0;
    }
    if (keyCode == 13) {
      if (gameState != 1) {
        ball1 = new Ball(250, 200, 20, 20, 0);
        gameState = 1;
      }
    }
  }