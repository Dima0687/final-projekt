// library
import express from 'express';

// middleware
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandlerMiddleware from './middleware/errorHandler.middleware.js';
import verify from './middleware/authentication.middleware.js'

// routes imports
import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/TEST.routes.js';
import eventsRoutes from './routes/events.routes.js';

// config
import { corsOptions } from './config/corsOptions.config.js';
import morganConfig from './config/morgan.config.js';



// application logic
const app = express();

// Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// logging logic
app.use(morganConfig);


// json body parser 
app.use(express.json());

// cookie parser
app.use(cookieParser());

// Routes
// signup, login, refresh
app.use(authRoutes);
// all event specific routes
app.use(eventsRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Backend läuft!');
})
// nur zum veranschaulichen =>
app.use(verify.jwt, testRoutes); 
// verifyJWT nimmt aus dem Header Authorization unseren Bearer JWT 
// und schaut ob der von unserem server kam, falls ja darf passiert werden


// error handling
app.use(errorHandlerMiddleware);

export default app;