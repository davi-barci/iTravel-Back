import {Router} from 'express';
import { getHotels } from '../controllers/hotelsController.js';

const hotelsRouter = Router();

hotelsRouter.get("/hotels/:id", getHotels);

export default hotelsRouter;