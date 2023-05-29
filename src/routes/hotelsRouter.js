import {Router} from 'express';
import { getHotelById, getHotels } from '../controllers/hotelsController.js';

const hotelsRouter = Router();

hotelsRouter.get("/hotels/:cityId/:id", getHotelById);
hotelsRouter.get("/hotels/:cityId", getHotels);

export default hotelsRouter;