var xSize = 1200;
var ySize = 600;
var rgb = 0;
var bc = 200;
var turnspeed = 3;
var walls = [];
var cars = [];
var checkpoints = [];
var TOTAL = 100;
var cardeadcount = 0;
var alldead = false;

function setup() {
  angleMode(DEGREES)
  for (i = 0; i < TOTAL; i ++) {
    cars[i] = new Car(20, 10, 350, 150, 0, 4, 83, 87);
  }
  createCanvas(xSize, ySize); 
  
  walls.push(new Wall(100, 100, 500, 100)); 
  walls.push(new Wall(200, 200, 500, 200));
  walls.push(new Wall(100, 200, 100, 100));
  walls.push(new Wall(700, 300, 700, 500));
  walls.push(new Wall(600, 300, 600, 400));
  walls.push(new Wall(500, 100, 700, 300));
  walls.push(new Wall(500, 200, 600, 300));
  walls.push(new Wall(600, 400, 300, 300));
  walls.push(new Wall(700, 500, 300, 400));
  walls.push(new Wall(300, 300, 200, 200));
  walls.push(new Wall(300, 400, 100, 200));

  checkpoints.push(new Checkpoint(500, 100, 500, 200));
  checkpoints.push(new Checkpoint(600, 300, 700, 300));
  checkpoints.push(new Checkpoint(600, 400, 700, 500));
  checkpoints.push(new Checkpoint(300, 300, 300, 400));
  checkpoints.push(new Checkpoint(200, 100, 200, 200));
  checkpoints.push(new Checkpoint(200, 200, 100, 200));
}

function draw() {
  background(bc);

  for (let wall of walls) {
    wall.display();
  }
  for (let checkpoint of checkpoints) {
    checkpoint.display();
  }
  for (car of cars) {
    car.display();
    car.raycalc(walls);
    
    for (let i = 0; i <  walls.length; i++) {
      car.cornercalc(walls[i]);
    }

    car.checkpointcalc(checkpoints[car.checkpoints]);
    
    car.think();
    car.move()
  }

  for (car in cars) {
    if (car.caralive == false) {
      cardeadcount++
    }
  }

  if (cardeadcount == TOTAL) {
    alldead = true;
  }

  if (keyIsDown(82)){
    for (car of cars){
      car.caralive = true;
      car.xPos = 350;
      car.yPos = 150;
      car.angle = 0;
    }
  } 
}
