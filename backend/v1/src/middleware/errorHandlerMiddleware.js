import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Etwas lief schief, bitte versuche es später nochmal!'
  }

  // TODO[] error handler middleware zuende schreiben

  // wenn ValidationError

  // wenn MongoServerError && code 11000

  // wenn CastError

  return res.status(customError.statusCode).json({ msg: customError.msg });
}


export default errorHandlerMiddleware;