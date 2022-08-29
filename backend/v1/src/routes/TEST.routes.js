import { Router } from 'express';
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
} from '../controller/TEST.controller.js';

// verfiy middleware
import verify from '../middleware/authentication.middleware.js';

// config
import ROLES_LIST from '../config/roles.config.js';

const router = Router();

router.route('/test')
  .post(createOne)
  .get(verify.roles(ROLES_LIST.organizer), getAll);

router.route('/test/:id')
  .get(verify.roles(ROLES_LIST.user), getOne)
  .patch(verify.roles(ROLES_LIST.organizer), updateOne)
  .delete(verify.roles(ROLES_LIST.admin), deleteOne);

export default router;