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

// routes imports
import authRoutes from './routes/auth.routes.js';

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

// Cross-Origin Resource Sharing
app.use(cors()); // TODO[](Dima) <= muss zum ende hin noch corsOptions rein

// Routes
app.use('/login', authRoutes);

app.get('/', (req, res, next)=>{
  res.status(200).send('Server läuft')
})

export default app;