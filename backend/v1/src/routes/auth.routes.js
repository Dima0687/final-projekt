import { Router } from 'express';
import {
  handleSignUp,
  handleLogin,
  handleLogout,
  handleRefreshToken
} from '../controller/auth.controller.js';

const router = Router();

router.route('/signup')
  .post(handleSignUp);

router.route('/login')
  .post(handleLogin);

router.route('/logout')
  .get(handleLogout);

router.route('/refresh')
  .get(handleRefreshToken);

export default router;