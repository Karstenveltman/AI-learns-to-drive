var xSize = 600;
var ySize = 350;
var rgb = 0;
var bc = 200;
var turnspeed = 3;
var walls = []
carAlive = true

function setup() {
  angleMode(DEGREES)
  Car1 = new Car(20, 10, 150, 150, 0, 3, 83, 87);
  createCanvas(xSize, ySize);  
  walls.push(new Wall(200, 225, 400, 225));
  walls.push(new Wall(100, 350/3, 100, 350/2*2));
  walls.push(new Wall(100, 350/3, 500, 350/3));
  walls.push(new Wall(500, 350/3, 500, 350/2*2));
  walls.push(new Wall(100, 350/2*2, 500, 350/2*2));
}

function draw() {
  background(bc);
  for (let wall of walls) {
    wall.display();
  }
  Car1.display(walls);
  for (let i = 0; i <  walls.length; i++) {
    Car1.cornercalc(walls[i]);
  }
  Car1.move();
  if (keyIsDown(82)){
    Car1.caralive = true;
    Car1.xPos = 150;
    Car1.yPos = 150;
    Car1.angle = 0;
  } 
}
