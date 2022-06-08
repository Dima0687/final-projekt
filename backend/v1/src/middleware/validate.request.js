import { StatusCodes } from 'http-status-codes';
import { validationResult } from "express-validator";


const validateRequest = (req, res, next) => {
  const validationErrors = validationResult(req);

  if(validationErrors.isEmpty()){
    next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors.array()
    })
  }
}

export {
  validateRequest
}