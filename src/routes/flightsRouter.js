import {Router} from 'express';
import { getFlightById, getFlights } from '../controllers/flightsController.js';

const flightsRouter = Router();

flightsRouter.get("/flights/:originCity/:destinationCity", getFlights);
flightsRouter.get("/flights/:id", getFlightById);

export default flightsRouter;