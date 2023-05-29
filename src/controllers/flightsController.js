import { db } from '../database/database.connection.js';

export async function getFlights(req, res) {
    const { originCity, destinationCity } = req.params;
    const { maxValue, minValue } = req.query;

    try {
        const flights = await db.query(`
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
        return res.status(200).send(flights.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


export async function getFlightById(req, res) {
    const { id } = req.params;

    try {
        const flight = await db.query(`
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
            f.id = $1;
    `, [id]);
        return res.status(200).send(flight.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
