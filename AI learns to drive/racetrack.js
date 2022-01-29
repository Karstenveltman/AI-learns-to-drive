function track(){
    walls = [];
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

    checkpoints = [];
    checkpoints.push(new Checkpoint(500, 200, 500, 100));
    checkpoints.push(new Checkpoint(600, 300, 700, 300));
    checkpoints.push(new Checkpoint(600, 400, 700, 500));
    checkpoints.push(new Checkpoint(450, 350, 500, 450));
    checkpoints.push(new Checkpoint(300, 300, 300, 400));
    checkpoints.push(new Checkpoint(200, 200, 100, 200));
    checkpoints.push(new Checkpoint(200, 200, 200, 100));
}

function finishflag() {
    stroke(0);
    fill(255);
    rect(300, 100, 20, 100);
    stroke(0);
    fill(0);
    rect(300, 100, 10, 10);
    rect(310, 110, 10, 10);
    rect(300, 120, 10, 10);
    rect(310, 130, 10, 10);
    rect(300, 140, 10, 10);
    rect(310, 150, 10, 10);
    rect(300, 160, 10, 10);
    rect(310, 170, 10, 10);
    rect(300, 180, 10, 10);
    rect(310, 190, 10, 10);
}