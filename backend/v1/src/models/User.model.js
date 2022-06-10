import mongoose from 'mongoose';
import Event from './Event.model.js';

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
  organizier: {
    type: Boolean,
    required: true
  },
  email: {
    type: String,
    // unique: true,
    required: true
  },
  username: {
    type: String,
    // unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: function(){
      return this.organizier
    }
  },
  lastname: {
    type: String,
    required: function(){
      return this.organizier
    }
  },
  roles: {
    admin: Number,
    organizier: {
      type: Number,
      default: function(){
        return this.organizier ? 5050 : null
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
      required: function(){
        return this.organizier
      }
    },
    houseNr: {
      type: Number,
      required: function(){
        return this.organizier
      }
    },
    city: {
      type: String,
      required: function(){
        return this.organizier
      }
    },
    zip: {
      type: Number,
      required: function(){
        return this.organizier
      }
    },
    _id: false
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: String,
  eventCompany: String,
  eventsILike: [String],
  eventParticipations: [ { type: mongoose.Schema.Types.ObjectId, ref: Event } ]
});

// TODO[](Dima) signup, access & refresh, logout

export default mongoose.model('User', userSchema);