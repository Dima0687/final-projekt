import { StatusCodes } from 'http-status-codes';
import User from '../models/User.model.js';

// TODO[] vor signup muss express validator geschaltet werden
async function handleSignUp(req, res, next){
  try {

    const user = await new User(req.body);
    user.hashPassword(req.body.password);

    res.status(StatusCodes.CREATED).json({
      msg: `Für ${req.body.username} wurde ein Benutzerkonto angelegt!`
    })
  } catch (error) {
    // TODO[] evtl. noch eigene Fehlerbehandlung implemtieren
    next(error);
  }
}

async function handleLogin(req, res, next){
  const { email, password } = req.body;

  try {
   const { user, refreshToken, accessToken }= await User.login(email, password);
    
    const hours = 24,
      minutes = 60,
      seconds = 60,
      milliseconds = 1000;
    const oneDay = hours * minutes * seconds * milliseconds;

    res.cookie(
      'jwt', 
      refreshToken, 
      { 
        httpOnly: true, sameSite: 'None', 
        secure: process.env.NODE_ENV === 'production',
        maxAge: oneDay
      }
    )
    // res.redirect('/') // hier könnte man den Nutzer direkt weiterleiten
    res.status(StatusCodes.ACCEPTED).json({
      msg: `Hallo ${user.username}!`,
      accessToken 
    });
  } catch (error) {
    next(error);
  }
}

const checkForCookies = (req) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return false;
  return cookies.jwt;
}
async function handleLogout(req, res, next){

  const refreshToken = checkForCookies(req);
  
  if(!refreshToken) return res.sendStatus(StatusCodes.NO_CONTENT)

  try {
    await User.logout(res, refreshToken);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error)
  }
}

async function handleRefreshToken(req, res, next){
  const refreshToken = checkForCookies(req);
  
  if(!refreshToken) return res.sendStatus(StatusCodes.NO_CONTENT)
  
  try {
    await User.refreshToken(res, refreshToken);

  } catch (error) {
    next(error);
  }
}

export {
  handleSignUp,
  handleLogin,
  handleLogout,
  handleRefreshToken
}