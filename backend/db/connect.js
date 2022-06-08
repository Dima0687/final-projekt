import mongoose from "mongoose";
import 'dotenv/config';


const connectDB = () => {
  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASSWORD;
  const cluster = process.env.MONGO_CLUSTER;

  const dbName = 'todos-app'
  const uri = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}

export default connectDB