class Ray {
    constructor(posx, posy, angle) {
      this.pos = createVector(posx, posy);
      this.dir = p5.Vector.fromAngle(radians(angle));
    }
  
    display() {
      stroke(255);
      push();
      translate(this.pos.x, this.pos.y);
      line(0, 0, this.dir.x * 50, this.dir.y * 50);
      pop();
    }
  
    cast(wall) {
      const x1 = wall.point1.x;
      const y1 = wall.point1.y;
      const x2 = wall.point2.x;
      const y2 = wall.point2.y;
  
      const x3 = this.pos.x;
      const y3 = this.pos.y;
      const x4 = this.pos.x + this.dir.x;
      const y4 = this.pos.y + this.dir.y;

      const t = Lineintersection_t(x1, y1, x2, y2, x3, y3, x4, y4)
      const u = Lineintersection_u(x1, y1, x2, y2, x3, y3, x4, y4)
      if (0 < t && t < 1 && u > 0) {
          const pointx = (x1 + t * (x2 - x1));
          const pointy = (y1 + t * (y2 - y1));
          const intersectPoint = createVector(pointx, pointy);
          return intersectPoint;
      }
      else{
          return
      }
    }
}