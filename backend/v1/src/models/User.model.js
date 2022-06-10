import mongoose from 'mongoose';

// models
import Event from './Event.model.js';

// password
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// error handling
import { UnauthenticatedError } from '../errorHandler/index.js';
import { StatusCodes } from 'http-status-codes';

/* const addressSchema = new mongoose.Schema({
  street:{
    type: String,
    required: function () {
      return this.organizier
    }
  },
  houseNr: {
    type: Number,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  zip: {
    type: Number,
    // required: true
  },
  _id: false
}); */

const userSchema = new mongoose.Schema({
  organizer: {
    type: Boolean,
    required: true
  },
  email: {
    type: String,
    // unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    // unique: true,
    required: true
  },
  firstname: {
    type: String,
    default: '',
    required: function(){
      return this.organizer
    }
  },
  lastname: {
    type: String,
    default: '',
    required: function(){
      return this.organizer
    }
  },
  roles: {
    admin: Number,
    organizer: {
      type: Number,
      default: function(){
        return this.organizer ? 5050 : null
      }
    },
    user:{
      type: Number,
      default: 1111
    }
  },
  address: {
    street:{
      type: String,
      default: null,
      required: function(){
        return this.organizer
      }
    },
    houseNr: {
      type: Number,
      default: null,
      required: function(){
        return this.organizer
      }
    },
    city: {
      type: String,
      default: null,
      required: function(){
        return this.organizer
      }
    },
    zip: {
      type: Number,
      default: null,
      required: function(){
        return this.organizer
      }
    },
    _id: false
  },
  refreshToken: {
    type: String,
    default: null
  },
  eventCompany: {
    type: String,
    default: null
  },
  eventTypesILike: {
    type: [String],
    default: []
  },
  eventParticipations: {
    type: [ { type: mongoose.Schema.Types.ObjectId, ref: Event } ],
    default: []
  }
});

// TODO[x](Dima) signup, access & refresh, logout

// generiere und speichere das Passwort
/* userSchema.pre('save', async function(){
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);

  console.log('save',this.roles);
}); */

// hash das password
userSchema.methods.hashPassword = async function(){
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  this.save();
}

const getRolesArray = (schema)=> {
  const rolesArray = Object.values(schema.roles).filter(role => role !== undefined);
  return rolesArray
}
// erstelle ein ACCESS TOKEN
userSchema.methods.createAndGetAccessToken = function(){
  const rolesArray = getRolesArray(this);
  return jwt.sign(
    { userId: this._id, name: this.username, roles: rolesArray},
      process.env.ACCESS_SECRET_TOKEN,
    { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
  )
};

// erstelle ein REFRESH TOKEN und speichere es
userSchema.methods.createGetAndStoreRefreshToken = function(){
  const rolesArray = getRolesArray(this);
  const refreshToken = jwt.sign(
    { name: this.username, roles: rolesArray },
      process.env.REFRESH_SECRET_TOKEN,
    { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }
  );
  
  this.refreshToken = refreshToken;
  this.save();

  return refreshToken; 
};

// Vergleiche das Passwort
userSchema.methods.comparePassword = async function(canditatePassword){
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
}

// Suche den User mit email und gib uns die Tokens
userSchema.statics.login = async function(email, password){
  const user = await this.findOne({ email });
  if(!user) throw new UnauthenticatedError('Falsche E-Mail Adresse');

  const auth = await user.comparePassword(password);
  if(!auth) throw new UnauthenticatedError('Falsches Passwort');

  const accessToken = user.createAndGetAccessToken();
  const refreshToken = user.createGetAndStoreRefreshToken(email);
  
  return {
    user,
    accessToken,
    refreshToken
  };
}

// Suche den User mit dem refreshToken und lösche diesen
userSchema.statics.logout = async function(res, refreshToken){
  const user = await this.findOne({refreshToken});
  
  const hours = 24,
      minutes = 60,
      seconds = 60,
      milliseconds = 1000;
  const oneDay = hours * minutes * seconds * milliseconds;

  const options = {
    httpOnly: true,
    sameSite: 'None',
    secure: process.env.NODE_ENV,
    maxAge: oneDay
  }

  if(!user){
    res.clearCookie('jwt', options);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  }

  user.refreshToken = null;

  user.save();

  res.clearCookie('jwt', options);
}

// generiere mit dem refrehToken einen neuen access token "erfrische token"
userSchema.statics.refreshToken = async function(res, refreshToken){
  const user = await this.findOne({ refreshToken });

  if(!user) return res.sendStatus(StatusCodes.FORBIDDEN);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_TOKEN,
    async (err, decoded) => {
      if( err || user.username !== decoded.name) return res.sendStatus(StatusCodes.FORBIDDEN);
      
      // evtl Fehler mit den rollen, falls nicht muss kommi weg

      const accessToken = await user.createAndGetAccessToken();

      res.json({ accessToken })
    }
  )
}

export default mongoose.model('User', userSchema);