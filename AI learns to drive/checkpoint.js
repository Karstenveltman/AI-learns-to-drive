
class Checkpoint {
  constructor(x1, y1, x2, y2) {
    this.point1 = createVector(x1, y1);
    this.point2 = createVector(x2, y2);
    this.point3 = createVector((x2 + x1) / 2, (y2 + y1) / 2)
  }

  display() {
    stroke(255, 255, 0);
    line(this.point1.x, this.point1.y, this.point3.x, this.point3.y);
    stroke(0, 0, 255);
    line(this.point3.x, this.point3.y, this.point2.x, this.point2.y);
  }
}