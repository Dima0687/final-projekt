// nodejs build in
import http from 'http';

// library
import mongoose from 'mongoose';

// own stuff
import v1App from './v1/src/app.js';
import connectDB from './db/connect.js';

const httpServer = http.createServer(v1App);

const port = process.env.PORT || 3000;

connectDB();

mongoose.connection.once('disconnected', () => {
  console.log(`\u001b[31mDatabase disconnected\u001b[0m`);
});

mongoose.connection.once('connected', () => {
  console.log(`\u001b[32mConnected to Database\u001b[0m`);
  httpServer.listen(port, console.log(`\u001b[34mListen to Server on port ${port}\u001b[0m`));
});