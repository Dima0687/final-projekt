import { StatusCodes } from 'http-status-codes';
import cookieConfig from '../config/cookie.config.js';
import User from '../models/User.model.js';
async function handleSignUp(req, res, next){
  try {
    const { email, password, username } = req.body;
    const user = await new User(req.body);
    
    if(email && password && username) {
      await user.hashPassword();
      return res.status(StatusCodes.CREATED).json({
        msg: `Für ${req.body.username} wurde ein Benutzerkonto angelegt!`
      })
    }
  } catch (error) {
    next(error);
  }
}

async function handleLogin(req, res, next){
  const { email, password } = req.body;

  try {
   const { user, refreshToken, accessToken }= await User.login(email, password);
    
    res.cookie(
      'jwt', 
      refreshToken, 
      cookieConfig
    )

    res.status(StatusCodes.ACCEPTED).json({
      msg: `Hallo ${user.username}!`,
      user,
      accessToken 
    });
  } catch (error) {
    next(error);
  }
}

const checkForCookies = (req) => {
  const cookies = req.cookies;
  console.log(req);
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