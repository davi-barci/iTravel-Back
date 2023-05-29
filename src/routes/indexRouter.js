import {Router} from 'express';
import adminRouter from './adminRouter.js';
import hotelsRouter from './hotelsRouter.js';

const router = Router();
router.use(adminRouter);
router.use(hotelsRouter);

export default router;