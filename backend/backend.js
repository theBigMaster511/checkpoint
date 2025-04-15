const express = require('express');

const app = express();
const PORT = 3000;


app.use(express.json());


let cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020, available: true },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2019, available: true },
    { id: 3, brand: 'Ford', model: 'Focus', year: 2021, available: false },
];


app.get('/cars', (req, res) => {
    res.json(cars);
});


app.get('/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('Car not found');
    res.json(car);
});


app.post('/cars', (req, res) => {
    const newCar = {
        id: cars.length + 1,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        available: req.body.available,
    };
    cars.push(newCar);
    res.status(201).json(newCar);
});


app.put('/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('Car not found');

    car.brand = req.body.brand || car.brand;
    car.model = req.body.model || car.model;
    car.year = req.body.year || car.year;
    car.available = req.body.available !== undefined ? req.body.available : car.available;

    res.json(car);
});


app.delete('/cars/:id', (req, res) => {
    const carIndex = cars.findIndex(c => c.id === parseInt(req.params.id));
    if (carIndex === -1) return res.status(404).send('Car not found');

    const deletedCar = cars.splice(carIndex, 1);
    res.json(deletedCar);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});