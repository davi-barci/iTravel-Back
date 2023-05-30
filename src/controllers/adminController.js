import { postFlightsRepository, postHotelRepository } from "../repositories/adminRepository.js";

export async function postHotel(req, res) {
    const { cityId, name, rating, reviewsNumber, address, dailyPrice, description } = req.body;

    try {
        const hotel = await postHotelRepository(cityId, name, rating, reviewsNumber, address, dailyPrice, description);      
        if (!hotel.rowCount) return res.status(409).send("Hotel já cadastrado!");
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function postFlights(req, res) {
    const { originCityId, destinationCityId, airline, outputForecast, 
        arrivalForecast, price, originAirport, destinationAirport, image } = req.body;

    try {
        const hotel = await postFlightsRepository(originCityId, destinationCityId, airline, outputForecast, 
            arrivalForecast, price, originAirport, destinationAirport, image);
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};