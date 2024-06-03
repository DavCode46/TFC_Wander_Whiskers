import { Router } from 'express';

import * as ordersCtrl from '../controllers/orders.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router()

router.get('/user/:id', ordersCtrl.getOrders)
router.get('/user/:id', ordersCtrl.getOrder)

export default router