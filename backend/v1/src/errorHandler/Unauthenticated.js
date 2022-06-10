//TODO[] Schreibe eine Error Class für unauthorized

import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends Error {
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}


export {
  UnauthenticatedError
}