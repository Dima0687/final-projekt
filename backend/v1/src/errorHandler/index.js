/* 
  Dieser Schritt mit index.js ist nötig um
  in anderen modulen die imports zu reduzieren, 
  da wir so direkt die gewünschten Klassen aus 
  nur einem Modul uns ziehen können
*/
// TODO[] Ergänze die index.js mit den restlichen Error Klassen

import { BadRequestError } from "./BadRequest.js";
import { UnauthorizedError } from "./Unauthorized.js";
import { NotFoundError } from "./NotFound.js";


export {
  BadRequestError,
  UnauthorizedError,
  NotFoundError
}