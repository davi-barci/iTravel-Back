import { getFlightByIdRepository, getFlightsRepository } from "../repositories/flightsRepository.js";

export async function getFlights(req, res) {
    const { originCity, destinationCity } = req.params;
    const { maxValue, minValue } = req.query;

    try {
        const flights = await getFlightsRepository(originCity, destinationCity, maxValue, minValue);
        return res.status(200).send(flights.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


export async function getFlightById(req, res) {
    const { id } = req.params;

    try {
        const flight = await getFlightByIdRepository(id);
        return res.status(200).send(flight.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
