// react
import { Navigate } from 'react-router-dom';

// util
import jwt_decode from 'jwt-decode';
import axios from "../api/axios";


const createGetAndSetRefreshToken = async (test) => {
  const res = await axios.get('/refresh', {withCredentials:true})
  return setAxiosDefaultHeader(res.data.accessToken, test);
}

const setAxiosDefaultHeader = (token, testComp) => {

  axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

  const authHeader = { ...axios.defaults.headers.common };
  const isBearerIncluded = authHeader.authorization.includes('Bearer eyJh');
 
  /* 
    Wir dokodieren unser JWT in dem der erstell Zeitpunkt als auch der Ablaufzeitpunkt
    enthalten ist. Wir setzen daraufhin die setTimeout funktion die nach ablauf dieser
    Zeit feuert und den header leer macht, als auch den refreshToken aus der Datenbank
    im Dokument löscht! Daraufhin wird AuthContext mit dem aktuellen status 
  */
  if(isBearerIncluded){
    const decodedToken = jwt_decode(token);
    const timeTillExpInMs = ( decodedToken.exp - decodedToken.iat ) * 1000;
    return setTimeout(() => {
      axios.defaults.headers.common['authorization'] = "";
      axios.get('/logout');
    }, timeTillExpInMs);

  } else {
    return <Navigate to='/login' replace />
  }
}

export {
  createGetAndSetRefreshToken,
  setAxiosDefaultHeader
}