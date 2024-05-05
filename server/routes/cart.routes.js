import { Router } from 'express';

import * as cartCtrl from '../controllers/cart.controller.js';
import authenticate from '../middleware/auth.middleware.js';


const router = Router()

router.get('cart', cartCtrl.getProductsCart)
router.post('cart', authenticate, cartCtrl.addProductCart)
router.put('cart/:id',authenticate, cartCtrl.updateProductCart)
router.delete('cart/:id',authenticate, cartCtrl.deleteProductCart)

export default router;

