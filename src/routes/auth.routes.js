import { Router } from 'express';
import {
  signInController,
  signOutController,
  signUpController,
  refreshAccessTokenController,
  getCurrentUserController,
} from '../controllers/auth.controllers.js';
import { verifyAccessTokenMiddleware } from '../middlewares/auth.middlewares.js';

const router = Router();

router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);
router.post('/sign-out', signOutController);
router.post('/refresh-token', refreshAccessTokenController);
router.get('/profile', verifyAccessTokenMiddleware, getCurrentUserController);

export default router;
