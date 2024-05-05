import { Router } from 'express';

import * as productCtrl from '../controllers/products.controller.js';


const router = Router()

router.get('/products', productCtrl.getProducts)
// router.get('/products/:id', productCtrl.getProduct)

export default router;