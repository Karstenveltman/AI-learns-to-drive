function newGeneration() {
    if (alldead == true) {
        var improve = false;
        for (car of cars) {
            if (car.fitness > best) {
                best = car.fitness;
                bestcar = car;
                improve = true;
            }
        }
        if (improve == false) {
            notimproving += 1;
        }
        else if (improve == true) {
            notimproving = 0;
        }
        for (i = 0; i < TOTAL-1; i ++) {
            cars[i] = new Car(20, 10, 250, 150, 0, 4, 83, 87, false, "black", bestcar.brain);
        }
        cars[TOTAL-1] = new Car(20, 10, 250, 150, 0, 4, 83, 87, true, "red", bestcar.brain);
        cardeadcount = 0;
        gen ++;
        alldead = false;
    }
}