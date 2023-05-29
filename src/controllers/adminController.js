import { db } from '../database/database.connection.js';

export async function postHotel(req, res) {
    const { cityId, name, rating, reviewsNumber, address, dailyPrice, description } = req.body;

    try {
        const hotel = await db.query(
            `INSERT INTO hotels ("cityId", "name", "rating", "reviewsNumber", "address", "dailyPrice", "description")
            SELECT $1, $2, $3, $4, $5, $6, $7
            WHERE NOT EXISTS (
                SELECT 1 FROM hotels WHERE "name" = $2 AND "address" = $5
            );`,
            [cityId, name, rating, reviewsNumber, address, dailyPrice, description]
        );
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
        const hotel = await db.query(
            `INSERT INTO flights ("originCityId", "destinationCityId", 
            "airline", "outputForecast", "arrivalForecast", "price", 
            "originAirport", "destinationAirport", "image")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
            [originCityId, destinationCityId, airline, outputForecast, arrivalForecast, price, originAirport, destinationAirport, image]
        );
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};