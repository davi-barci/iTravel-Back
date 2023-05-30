import { db } from '../database/database.connection.js';

export async function getFlightsRepository(originCity, destinationCity, minValue, maxValue){
    return db.query(`
    SELECT
        f.id,
        c_origin.name AS originCity,
        c_destination.name AS destinationCity,
        a.name AS airline,
        f."outputForecast",
        f."arrivalForecast",
        f.price,
        ap_origin.name AS originAirport,
        ap_origin.acronym AS originAirportAcronym,
        ap_destination.acronym AS destinationAirportAcronym,
        ap_destination.name AS destinationAirport,
        a.logo AS airlineLogo,
        f.image
    FROM
        flights AS f
    JOIN
        cities AS c_origin ON f."originCityId" = c_origin.id
    JOIN
        cities AS c_destination ON f."destinationCityId" = c_destination.id
    JOIN
        airports AS ap_origin ON f."originAirport" = ap_origin.id
    JOIN
        airports AS ap_destination ON f."destinationAirport" = ap_destination.id
    JOIN
        airlines AS a ON f.airline = a.id
    WHERE
        (f."originCityId" = $1 OR $1 = 0)
        AND f."destinationCityId" = $2
        AND f.price BETWEEN $3 AND $4;
`, [originCity, destinationCity, minValue, maxValue]);
}

export async function getFlightByIdRepository(id){
    return db.query(`
    SELECT
        f.id,
        c_origin.name AS originCity,
        c_destination.name AS destinationCity,
        a.name AS airline,
        f."outputForecast",
        f."arrivalForecast",
        f.price,
        ap_origin.name AS originAirport,
        ap_origin.acronym AS originAirportAcronym,
        ap_destination.acronym AS destinationAirportAcronym,
        ap_destination.name AS destinationAirport,
        a.logo AS airlineLogo,
        a.rating AS airlineRating,
        f.image
    FROM
        flights AS f
    JOIN
        cities AS c_origin ON f."originCityId" = c_origin.id
    JOIN
        cities AS c_destination ON f."destinationCityId" = c_destination.id
    JOIN
        airports AS ap_origin ON f."originAirport" = ap_origin.id
    JOIN
        airports AS ap_destination ON f."destinationAirport" = ap_destination.id
    JOIN
        airlines AS a ON f.airline = a.id
    WHERE
        f.id = $1;
`, [id]);
}