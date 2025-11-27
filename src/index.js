// Imports your SCSS stylesheet
import './styles/index.scss';

// Import car data
import carData from './car-dataset.json';

// App logic
class CarFinder {
    constructor(data) {
        this.cars = data;
    }

    // Method to filter cars by year, make, model
    findCars(year, make, model) {
        return this.cars.filter(car => {
            return car.year === year &&
            car.make === make &&
            car.model === model;
        });
    }
}