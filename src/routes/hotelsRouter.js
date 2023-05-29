import {Router} from 'express';
import { getHotelById } from '../controllers/hotelsController.js';

const hotelsRouter = Router();

hotelsRouter.get("/hotels/:id", getHotelById);

export default hotelsRouter;