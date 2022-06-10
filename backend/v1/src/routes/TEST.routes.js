import { Router } from 'express';
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
} from '../controller/TEST.controller.js';

const router = Router();

router.route('/test')
  .post(createOne)
  .get(getAll);

router.route('/test/:id')
  .get(getOne)
  .patch(updateOne)
  .delete(deleteOne);

export default router;