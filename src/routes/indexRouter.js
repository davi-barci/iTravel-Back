import {Router} from 'express';
import adminRouter from './adminRouter.js';
import hotelsRouter from './hotelsRouter.js';
import flightsRouter from './flightsRouter.js';

const router = Router();
router.use(adminRouter);
router.use(hotelsRouter);
router.use(flightsRouter);

export default router;