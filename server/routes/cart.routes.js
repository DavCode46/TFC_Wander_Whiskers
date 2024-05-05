import { Router } from 'express';

import * as cartCtrl from '../controllers/cart.controller.js';
import authenticate from '../middleware/auth.middleware.js';


const router = Router()

router.get('/:id', cartCtrl.getProductsCart)
router.post('/:id', cartCtrl.addProductCart)
router.put('/:id',authenticate, cartCtrl.updateProductCart)
router.delete('/:id',authenticate, cartCtrl.deleteProductCart)
router.post('/checkout', cartCtrl.checkout)

export default router;

