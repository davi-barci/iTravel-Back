import { db } from '../database/database.connection.js';

export async function postHotelRepository (cityId, name, rating, reviewsNumber, address, dailyPrice, description) {
	return db.query(`INSERT INTO hotels ("cityId", "name", "rating", "reviewsNumber", "address", "dailyPrice", "description")
        SELECT $1, $2, $3, $4, $5, $6, $7
        WHERE NOT EXISTS (
            SELECT 1 FROM hotels WHERE "name" = $2 AND "address" = $5
        );`,
        [cityId, name, rating, reviewsNumber, address, dailyPrice, description]);
}

export async function postFlightsRepository(originCityId, destinationCityId, airline, outputForecast, arrivalForecast, price, originAirport, destinationAirport, image){
    return db.query(
        `INSERT INTO flights ("originCityId", "destinationCityId", 
        "airline", "outputForecast", "arrivalForecast", "price", 
        "originAirport", "destinationAirport", "image")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
        [originCityId, destinationCityId, airline, outputForecast, arrivalForecast, price, originAirport, destinationAirport, image]
    );
}