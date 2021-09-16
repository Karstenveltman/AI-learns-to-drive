
class Car {
  constructor(xLength, yLength, xPos, yPos, angle, speed, up, down){
    this.xLength = xLength
    this.yLength = yLength
    this.xPos = xPos;
    this.yPos = yPos;
    this.angle = angle;
    this.speed = speed;
    this.up = up;
    this.down = down;
    this.rays = []
    this.totalrays = 9;
    this.fov = 180;
    this.carx1;
    this.carx2;
    this.carx3;
    this.carx4;
    this.cary1;
    this.cary2;
    this.cary3;
    this.cary4;
    this.caralive = true;
    this.carmoving = 0;
    this.distances = [];
    this.checkpoints = 0;
    
    this.brain = new NeuralNetwork(10, 10, 2);

    for (let i = 0; i < this.totalrays; i += 1) {
      this.rays.push(new Ray(this.xPos, this.yPos, this.angle));
    }
  }
  
  think(){
    let inputs = [];
    for (i = 0; i < 9; i++) {
      inputs[i] = map(this.distances[i], 0, xSize, 0, 1);
    }
    inputs.push(this.carmoving);
    
    let output = this.brain.predict(inputs);

    if (output[0] >= 0 && output[0] <= 0.5){
      this.carmoving = 0;
    }

    if (output[0] > 0.5 && output[0] < 1){
      this.carmoving = 1;
    }

    if (output[1] > 0 && output[1] < 0.33) {
      this.angle += turnspeed;
    }

    if (output[1] > 0.33 && output[1] < 0.66) {
    }

    if (output[1] > 0.66 && output[1] < 1) {
      this.angle -= turnspeed;
    }
  }

  display() {
    if (this.caralive == true) {
      fill(0);
      stroke(rgb)
      push()
      fill(255,0, 0);
      translate(this.xPos, this.yPos)
      rectMode(CENTER)
      rotate(this.angle)
      rect(0, 0, this.xLength, this.yLength);
      fill(255, 255, 255)
      rect(this.xLength/2.666, 0, this.xLength/5, this.yLength*0.8)
      pop()
    }
  }

  raycalc(walls){
    var distance;
    if(this.caralive == true){
      for (let i = 0; i < this.rays.length; i++) {
        const ray = this.rays[i];
        ray.pos = createVector(this.xPos, this.yPos);
        ray.dir = p5.Vector.fromAngle(radians(this.angle - (this.fov/2) + this.fov / (this.rays.length - 1) * i));
        let closest = null;
        let record = Infinity;
        for (let i = 0; i <  walls.length; i++) {
          const point = ray.cast(walls[i]);
          if (point) {
            distance = p5.Vector.dist(ray.pos, point)
            if (distance < record) {
              record = distance;
              closest = point;
            }
          }
        }
        if (closest) {
          stroke(240);
          line(this.xPos, this.yPos, closest.x, closest.y);
          this.distances[i] = distance;
        }
      }
    }
  }

  cornercalc(walls) {
    if (this.caralive == true) {
      this.carx1 = this.xPos + cos(this.angle + atan(5/10)) * sqrt(125);
      this.cary1 = this.yPos + sin(this.angle + atan(5/10)) * sqrt(125);

      this.carx4 = this.xPos + cos(this.angle - atan(5/10)) * sqrt(125);
      this.cary4 = this.yPos + sin(this.angle - atan(5/10)) * sqrt(125);

      this.carx3 = this.xPos - cos(this.angle + atan(5/10)) * sqrt(125);
      this.cary3 = this.yPos - sin(this.angle + atan(5/10)) * sqrt(125);

      this.carx2 = this.xPos - cos(this.angle - atan(5/10)) * sqrt(125);
      this.cary2 = this.yPos - sin(this.angle - atan(5/10)) * sqrt(125);
      const x1 = walls.point1.x;
      const y1 = walls.point1.y;
      const x2 = walls.point2.x;
      const y2 = walls.point2.y;

      const x3 = this.carx1;
      const y3 = this.cary1;
      const x4 = this.carx2;
      const y4 = this.cary2;
      const x5 = this.carx3;
      const y5 = this.cary3;
      const x6 = this.carx4;
      const y6 = this.cary4;

      const t1 = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
      const u1 = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
      const t2 = ((x1 - x5) * (y5 - y6) - (y1 - y5) * (x5 - x6)) / ((x1 - x2) * (y5 - y6) - (y1 - y2) * (x5 - x6));
      const u2 = ((x2 - x1) * (y1 - y5) - (y2 - y1) * (x1 - x5)) / ((x1 - x2) * (y5 - y6) - (y1 - y2) * (x5 - x6));
      
      if (0 < t1 && t1 < 1 && u1 > 0 && u1 < 1) {
        this.caralive = false;
      }
      else if (0 < t2 && t2 < 1 && u2 > 0 && u2 < 1){
        this.caralive = false;
      }
    }
  }

  checkpointcalc(checkpoint) {
    if (this.caralive == true) {
      this.carx1 = this.xPos + cos(this.angle + atan(5/10)) * sqrt(125);
      this.cary1 = this.yPos + sin(this.angle + atan(5/10)) * sqrt(125);

      this.carx4 = this.xPos + cos(this.angle - atan(5/10)) * sqrt(125);
      this.cary4 = this.yPos + sin(this.angle - atan(5/10)) * sqrt(125);

      this.carx3 = this.xPos - cos(this.angle + atan(5/10)) * sqrt(125);
      this.cary3 = this.yPos - sin(this.angle + atan(5/10)) * sqrt(125);

      this.carx2 = this.xPos - cos(this.angle - atan(5/10)) * sqrt(125);
      this.cary2 = this.yPos - sin(this.angle - atan(5/10)) * sqrt(125);
      const x1 = checkpoint.point1.x;
      const y1 = checkpoint.point1.y;
      const x2 = checkpoint.point2.x;
      const y2 = checkpoint.point2.y;

      const x3 = this.carx1;
      const y3 = this.cary1;
      const x4 = this.carx2;
      const y4 = this.cary2;
      const x5 = this.carx3;
      const y5 = this.cary3;
      const x6 = this.carx4;
      const y6 = this.cary4;

      const t1 = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
      const u1 = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
      const t2 = ((x1 - x5) * (y5 - y6) - (y1 - y5) * (x5 - x6)) / ((x1 - x2) * (y5 - y6) - (y1 - y2) * (x5 - x6));
      const u2 = ((x2 - x1) * (y1 - y5) - (y2 - y1) * (x1 - x5)) / ((x1 - x2) * (y5 - y6) - (y1 - y2) * (x5 - x6));
      
      if (0 < t1 && t1 < 1 && u1 > 0 && u1 < 1) {
        this.checkpoints++
        console.log(this.checkpoints)

      }
      else if (0 < t2 && t2 < 1 && u2 > 0 && u2 < 1){
        this.checkpoints++
      }
    }
  }

  move() {
    if (this.caralive == true) {
      if (this.carmoving == 1){
        this.xPos += cos(this.angle) * this.speed;
        this.yPos += sin(this.angle) * this.speed;
      } 
    }
  }
}