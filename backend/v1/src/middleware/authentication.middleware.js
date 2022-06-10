// TODO[x] jwt.verify aus dem header funktion
import jsonwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

// gleich wieder löschen
import ROLES_LIST from '../config/roles.config.js'

const jwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(StatusCodes.UNAUTHORIZED);
  
  const token = authHeader.split(' ')[1];
  jsonwt.verify(
    token,
    process.env.ACCESS_SECRET_TOKEN,
    (err, decoded) => {
      if(err) return res.sendStatus(StatusCodes.FORBIDDEN);
      req.user = decoded.name;
      req.roles = decoded.roles;
      next();
    }
  )
}


const roles = (...allowedRoles) => {
  // erhält über routes ein Array mit diversen ROLES die wir übergeben

  return (req, res, next) => {
    // falls kein request object vorhanden
    // oder wenn doch, aber kein roles darauf vorhanden ist
    // dann brich ab
    if(!req?.roles) return res.sendStatus(StatusCodes.UNAUTHORIZED);
    // kopiere dir den kompletten array
    const rolesArray = [...allowedRoles]
    
    // maped durch req.roles array
    // falls rolesArray eine dieser rollen enthält
    // dann gib true zurück, sonst undefined 
    const pass = req.roles.map( role => {
      if( rolesArray.includes(role)){
        return true
      }
    })
    // durchläuft den neuen array und schaut ob eines der
    // elemente true ist, 
    // ( find ist ein filter, wenn true gib zurück, wenn false ignorier )
    // sprich wenn "bool => true", dann haben wir einfach ein einzelnes
    // true, wodurch pass nun true ist
    .find(bool => bool);

    if(!pass) return res.sendStatus(StatusCodes.UNAUTHORIZED);
    
    next();
  }
}

export default {
  jwt,
  roles
};