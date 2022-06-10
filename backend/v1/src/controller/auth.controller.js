import { StatusCodes } from 'http-status-codes';

function handleSignUp(req, res, next){
  res.send('signup')
}

function handleLogin(req, res, next){
  res.send('login')
}

function handleLogout(req, res, next){
  res.send('logout')
}

function handleRefreshToken(req, res, next){
  res.send('refresh')
}

export {
  handleSignUp,
  handleLogin,
  handleLogout,
  handleRefreshToken
}