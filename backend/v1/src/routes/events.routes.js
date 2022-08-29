import { Router } from 'express';
import verify from '../middleware/authentication.middleware.js';
import {
  // create
  createEvent,
  // read
  getAllEvents,
  getSingleEvent,
  // update
  updateOneEvent,
  // delete
  deleteOneEvent
} from '../controller/events.controller.js';

// validators
import {
  eventValidationSchema,
  queryValidationSchema
} from '../validations/de/index.validations.js';

// validation function
import {
  validateRequest
} from '../middleware/validateRequest.middleware.js';

const router = Router();

router.route('/events')
     // create
    .put(
      verify.jwt, 
      eventValidationSchema, 
      validateRequest, 
      createEvent
      )
     // read
    .get(
      queryValidationSchema,
      validateRequest,
      getAllEvents
      )
  

router.route('/events/:id')
    .get(getSingleEvent)
    .patch(
      verify.jwt, 
      eventValidationSchema,
      validateRequest, 
      updateOneEvent
      )
    .delete(
      verify.jwt, 
      deleteOneEvent
      )

export default router;
