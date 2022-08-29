import mongoose from 'mongoose';
import User from './User.model.js';

const Address = new mongoose.Schema({
  street: {
    type: String,
    default: null,
    required: true
  },
  houseNr: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  _id:false
})

const eventSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: mongoose.Types.ObjectId()
  },
  title: {
    type: String,
    required: true
  },
  titleConstructed:{
    type: Boolean,
    default: false
  },
  description: String,
  location: Address,
  host: {
    type: String,
    required: true
  }, // Name des Veranstalters, der Veranstaltungsfirma
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }, // kann ja sein, das man für jemanden etwas erstellt
  eventTime: String, // event Time and Date vorerst auf String gestellt, vielleicht bleibt das so
  eventDate: String,
  cancelled: false,
  postponed: false, // postponed heißt verschoben
  eventTypes: {
    enum: ['Konzert', "Musical", "Oper", "Flashmob", "Buchvorstellung", "SitIn", "Grillen", "Meet & Greet"],
    type: String
  },
  participants: [{ type: mongoose.Types.ObjectId, ref: "User"}],
  
  maxParticipants: Number,
  website: String,
  imageUrl: String
});


const generateDateString = () => {
   // generate date
   const date = new Date();
   const day = date.getDate(),
     month = date.getMonth()+1,
     year = date.getFullYear(),
     localTime = date.toLocaleTimeString('de-DE');
   const dateString = `${day}-${month}-${year}-${localTime}`;

   return dateString;
};

const deleteOrReplaceSymbols = (str) => {
  let replacedString = str.replace(/(?:ß)/g, 'ss');
  let replacementTitle = replacedString.split(/\W/);
  replacementTitle = replacementTitle.filter( string => string !== '' );

  return replacementTitle;
};

eventSchema.pre('save', function(next){
  // if true don't repeat
  if(!this.titleConstructed){
    const splittedTitle = deleteOrReplaceSymbols(this.title)
    this.title = splittedTitle.join(' ')

    const dateString = generateDateString();
  
    const arrayWithDate = [...splittedTitle];
    arrayWithDate.push(dateString)
  
    // concat to string
    const joinedWithMinus = arrayWithDate.join('-');
    this._id = joinedWithMinus;
    this.titleConstructed = true;
  }
  next();
});

eventSchema.methods.saveUserId = async function(userId){
  const user = await User.findOne({ _id: userId });
  this.creator = user._id;
  this.save();
}

export default mongoose.model('Event', eventSchema);