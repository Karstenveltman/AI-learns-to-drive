function newGeneration() {
    if (alldead == true) {
        for (car of cars) {
            if (car.fitness > best) {
                best = car.fitness;
                console.log(best);
                bestcar = car;
            }
        }
        for (i = 0; i < TOTAL-1; i ++) {
            cars[i] = new Car(20, 10, 250, 150, 0, 4, 83, 87, false, "black", bestcar.brain);
        }
        cars[TOTAL-1] = new Car(20, 10, 250, 150, 0, 4, 83, 87, true, "red", bestcar.brain);
        cardeadcount = 0;
        alldead = false;
    }
}