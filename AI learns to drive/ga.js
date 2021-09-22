function newGeneration() {
    if (alldead == true) {
        for (car of cars) {
            if (car.totalcheckpoints > best) {
                best = car.totalcheckpoints;
                console.log(best);
                bestcar = car;
            }
        }
        cars[0] = new Car(20, 10, 350, 150, 0, 4, 83, 87, bestcar.brain, true);
        for (i = 1; i < TOTAL; i ++) {
            cars[i] = new Car(20, 10, 350, 150, 0, 4, 83, 87, bestcar.brain);
        }
        cardeadcount = 0;
        alldead = false;
    }
}