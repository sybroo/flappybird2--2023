var gravity, Ball1

class Ball{
  constructor(x, y, w, h, vy){
  this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.vy = vy;
  }
  drawBall() {
    fill("yellow");
    elipse(this.x, this.y, this.width, this.height, this.vy)

    this.vy += gravity;
  }
}

function setup() {
  createCanvas(600, 400);
  gravity = 0.25;
  Ball1 = new Ball(250, 200, 20, 20, 0);
}

function draw() {
  background(225);
  
  Ball1.drawBall();
}