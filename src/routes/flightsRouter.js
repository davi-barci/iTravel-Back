import {Router} from 'express';
import { getFlights } from '../controllers/flightsController.js';

const flightsRouter = Router();

flightsRouter.get("/flights/:originCity/:destinationCity", getFlights);

export default flightsRouter;