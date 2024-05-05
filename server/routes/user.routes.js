import { Router } from 'express';

import * as userCtrl from '../controllers/user.controller.js';
import authenticate from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getUser);
router.get('/', userCtrl.getUsers);
router.post('/change-image', authenticate, userCtrl.changeImage);
router.patch('/edit', authenticate, userCtrl.editUser);
router.delete('/:id', authenticate, userCtrl.deleteUser)

export default router;
