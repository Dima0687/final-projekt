import { StatusCodes } from 'http-status-codes';
import { validationResult } from "express-validator";


const validateRequest = (req, res, next) => {
  const validationErrors = validationResult(req);

  if(validationErrors.isEmpty()){
    next();
  } else {
    const errors = validationErrors.array().reduce((obj, err) => {
      obj[err.param] = err.msg;
      return obj
    },{});
    
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: errors 
    })
  }
}

export {
  validateRequest
}