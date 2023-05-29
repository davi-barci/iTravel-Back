import {Router} from 'express';
import { postFlights, postHotel } from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.post("/hotels", postHotel);
adminRouter.post("/flights", postFlights);

export default adminRouter;