import mongoose from 'mongoose';

// models
import Event from './Event.model.js';

// password
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// error handling
import { UnauthorizedError } from '../errorHandler/index.js';
import { StatusCodes } from 'http-status-codes';
import cookieConfig from '../config/cookie.config.js';

const userSchema = new mongoose.Schema({
  organizer: {
    type: Boolean,
    required: true,
    default: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
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
      type: String,
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

// hash das password
userSchema.methods.hashPassword = async function(err, doc, next){
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  await this.save();
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
userSchema.methods.createGetAndStoreRefreshToken = async function(){
  const rolesArray = getRolesArray(this);
  const refreshToken = jwt.sign(
    { name: this.username, roles: rolesArray },
      process.env.REFRESH_SECRET_TOKEN,
    { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }
  );
  
  this.refreshToken = refreshToken;
  await this.save();

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
  if(!user) throw new UnauthorizedError('Falsche E-Mail Adresse oder falsches Passwort');

  const auth = await user.comparePassword(password);
  if(!auth) throw new UnauthorizedError('Falsche E-Mail Adresse oder falsches Passwort');

  const accessToken = user.createAndGetAccessToken();
  const refreshToken = await user.createGetAndStoreRefreshToken(email);
  
  const u = await this.findOne({ email }).select('-password -__v -refreshToken')

  return {
    user: u,
    accessToken,
    refreshToken
  };
}

// Suche den User mit dem refreshToken und lösche den Token
userSchema.statics.logout = async function(res, refreshToken){
  const user = await this.findOne({refreshToken});

  if(!user){
    res.clearCookie('jwt', cookieConfig);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  }

  user.refreshToken = null;

  await user.save();

  res.clearCookie('jwt', cookieConfig);
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
      const accessToken = await user.createAndGetAccessToken();

      res.json({ accessToken })
    }
  )
}

export default mongoose.model('User', userSchema);