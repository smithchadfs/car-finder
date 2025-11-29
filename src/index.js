// Imports your SCSS stylesheet
import './styles/index.scss';

// Import car data
import carData from './car-dataset.json';


// App logic
class CarFinder {
    constructor(data) {
        this.cars = data;
    }

    // method to populate years dropdown
    populateYears(yearSelect) {
        // Get years from data and sort years in descending order (newest first)
    const years = [...new Set(this.cars.map(car => car.year))].sort((a, b) => b - a);
    
    // Add each year as an option
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
    }

    // method to populate make dropdown based on year
    populateMakes(makeSelect, year){
        // get make data, filter, and sort
        const makes = [...new Set(this.cars.filter(car => car.year == year).map(car => car.Manufacturer))].sort();

        // add each make as an option
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeSelect.appendChild(option);
        });
    }

    // method to populate model
    populateModels(modelSelect, year, make){
        // get model data, filter, and sort
        const models = [...new Set(this.cars.filter(car => car.year == year && car.Manufacturer == make).map(car => car.model))].sort();

        // add each model as an option
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
    
    
    // Method to filter cars by year, make, model
    findCars(year, make, model) {
        return this.cars.find(car => car.year == year && car.Manufacturer === make && car.model === model);
    }


    // Method to display results
    displayResults(car) {
        if (car) {
            console.log(car);
        } else {
            console.log('No car found with those specifications');
        }
    }

}

// Initialize when page loads
(()=>{
    const dreamCar = new CarFinder(carData);

    // Get dropdown elements
    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');

    // Populate years on load
    dreamCar.populateYears(yearSelect);

    // add event listeners
    yearSelect.addEventListener('change', () => {
        const selectedYear = yearSelect.value;

        // reset and disable make/model options
        makeSelect.innerHTML = '<option>Make</option>';
        makeSelect.disabled = false;
        modelSelect.innerHTML = '<option>Model</option>';
        modelSelect.disabled = true;

        // populate makes for selected year
        dreamCar.populateMakes(makeSelect, selectedYear);
    });

    makeSelect.addEventListener('change', () => {
        const selectedYear = yearSelect.value;
        const selectedMake = makeSelect.value;

        // reset and disable model dropdown
        modelSelect.innerHTML = '<option>Model</option';
        modelSelect.disabled = false;

        // populate models for selected year and make
        dreamCar.populateModels(modelSelect, selectedYear, selectedMake);
    });

    modelSelect.addEventListener('change', () => {
        const selectedYear = yearSelect.value;
        const selectedMake = makeSelect.value;
        const selectedModel = modelSelect.value;

        // find and display the car
        const car = dreamCar.findCars(selectedYear, selectedMake, selectedModel);
        dreamCar.displayResults(car);
    });
})()