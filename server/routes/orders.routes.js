import { Router } from 'express';

import * as ordersCtrl from '../controllers/orders.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router()

router.get('/users/:id', authenticate, ordersCtrl.getOrders)

export default router