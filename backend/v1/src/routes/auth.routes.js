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
  
// handleRefreshToken könnte man für jede route nutzen (als middleware)
// das bedeutet wenn wir igend ein link auf der page klicken, sich die Zeit 
// wie lange man sich auf der Seite befinden darf
// aktualisiert

export default router;