import { StatusCodes } from 'http-status-codes';

// handleLogin, handleLogout, handleSignUp
function handleSignUp(req, res, next){
  const { user, email, pwd } = req.body; // user, pwd sind die keys im frontend

  const duplicate = await User.findOne({ email });

}

function handleLogin(req, res, next){

}

function handleLogout(req, res, next){

}

export {
  handleSignUp,
  handleLogin,
  handleLogout
}