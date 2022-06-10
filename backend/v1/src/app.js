// nodejs build in
import rfs from 'rotating-file-stream';
import path from 'path';
import { fileURLToPath } from 'url';

// library
import express from 'express';

// middleware
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandlerMiddleware from './middleware/errorHandler.middleware.js';
import { validateRequest } from './middleware/validateRequest.middleware.js';
import verify from './middleware/authentication.middleware.js'

// routes imports
import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/TEST.routes.js';

// config
import { corsOptions } from './config/corsOption.config.js';


// create error log stream
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const errorLogStream = rfs.createStream('errors.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs')
})

// application logic
const app = express();

// logging logic
app.use(morgan(function (tokens, req, res) {
  return [ 
    ':method ', tokens.method(req, res), ' ',
    ':url ', tokens.url(req, res), ' ',
    ':status ', tokens.status(req, res), ' ',
    ':res[content-length] ', tokens.res(req, res, 'content-length'), ' - ',
    ':res[time] ', tokens['response-time'](req,res), 'ms'
  ].join('') + ' ' + req.ip;
}, {
  skip(req, res) { return res.statusCode < 400},
  stream: errorLogStream
}));


// json body parser 
app.use(express.json());

// cookie parser
app.use(cookieParser());

// Cross-Origin Resource Sharing
app.use(cors()); // TODO[] muss zum ende hin noch corsOptions rein

// Routes
app.use(authRoutes);
app.use(verify.jwt, testRoutes); 
// verifyJWT nimmt aus dem Header Authorization unseren Bearer JWT 
// und schaut ob der von unserem server kam, falls ja darf passiert werden


// error handling
app.use(errorHandlerMiddleware);

export default app;