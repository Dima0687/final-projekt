import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends Error {
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}


export {
  UnauthorizedError
}