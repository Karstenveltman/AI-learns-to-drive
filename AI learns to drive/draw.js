var xSize = 1200;
var ySize = 600;
var rgb = 0;
var bc = 200;
var turnspeed = 9;
var walls = [];
var cars = [];
var checkpoints = [];
var TOTAL = 100;
var cardeadcount = 0;
var notimproving = 0;
var alldead = false;
var showrays = false;
var best = 0;
var bestcar;
var carcount = TOTAL - cardeadcount;
var gen = 1;

function killthem(){
  alldead = true;
}

function showRays(){
  showrays = true;
}

function hideRays(){
  showrays = false;
}

function setup() {
  angleMode(DEGREES)
  for (i = 0; i < TOTAL; i ++) {
    cars[i] = new Car(20, 10, 250, 150, 0, 4, 83, 87, false, "black");
  }

  createCanvas(xSize, ySize); 
  let killButton = select('#kill');
  let showRayButton = select('#showRays');
  let hideRayButton = select('#hideRays');
  killButton.mousePressed(killthem);
  showRayButton.mousePressed(showRays)
  hideRayButton.mousePressed(hideRays)

  track();

}

function draw() {
  background(bc);

  finishflag()

  carcount = TOTAL - cardeadcount;
  newGeneration();
  text("frame rate: " + round(frameRate()), 20, 50);
  text("highscore: " + round(best), 20, 60);
  text("cars: " + carcount, 20, 70);
  text("generation: " + gen, 20, 80);

  for (let wall of walls) {
    wall.display();
  }
  for (i = 0; i < checkpoints.length; i++) {
    checkpoints[i].display();
  }
  for (car of cars) {
    car.display();
    car.raycalc(walls);
    
    for (let i = 0; i <  walls.length; i++) {
      car.cornercalc(walls[i]);
    }

    car.checkpointcalc(checkpoints[car.checkpoints]);
    if (car.checkpoints == checkpoints.length){
      car.checkpoints = 0;
    }
    
    car.think();
    car.move()

  }


  if (cardeadcount == TOTAL) {
    killthem();
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
