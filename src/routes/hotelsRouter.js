import {Router} from 'express';
import { getCities, getHotelById, getHotels } from '../controllers/hotelsController.js';

const hotelsRouter = Router();

hotelsRouter.get("/hotels/:cityId/:id", getHotelById);
hotelsRouter.get("/hotels/:cityId", getHotels);
hotelsRouter.get("/cities", getCities);

export default hotelsRouter;