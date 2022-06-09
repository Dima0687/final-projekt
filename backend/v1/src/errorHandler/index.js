/* 
  Dieser Schritt mit index.js ist nötig um
  in anderen modulen die imports zu reduzieren, 
  da wir so direkt die gewünschten Klassen aus 
  nur einem Modul uns ziehen können
*/
import { BadRequestError } from "./BadRequest";

// TODO[] Ergänze die index.js mit den restlichen Error Klassen



export {
  BadRequestError
}