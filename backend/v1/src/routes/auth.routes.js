import { Router } from 'express';
import {
  handleSignUp,
  handleLogin,
  handleLogout,
  handleRefreshToken
} from '../controller/auth.controller.js';
import { validateRequest } from '../middleware/validateRequest.middleware.js';

// validators
import {
  loginValidationSchema,
  registerValidationSchema
} from '../validations/de/index.validations.js';

const router = Router();

router.route('/signup')
  .post(
    registerValidationSchema,
    validateRequest,
    handleSignUp
  );

router.route('/login')
  .post(
    loginValidationSchema,
    validateRequest,
    handleLogin
  );

router.route('/logout')
  .get(handleLogout);

router.route('/refresh')
  .get(handleRefreshToken); 
  
// handleRefreshToken könnte man für jede route nutzen (als middleware)
// das bedeutet wenn wir igend ein link auf der page klicken, sich die Zeit 
// wie lange man sich auf der Seite befinden darf
// aktualisiert

export default router;