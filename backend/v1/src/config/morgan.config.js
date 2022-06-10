// middleware
import morgan from 'morgan';

// config
import errorLogStream from './errorLogStream.config.js';

const germany = 'de-DE'
export default morgan(function (tokens, req, res) {
  return [ 
    ':german-time: ', new Date().toLocaleDateString(germany),' ', new Date().toLocaleTimeString(germany), ' ',
    ':method ', tokens.method(req, res), ' ',
    ':url ', tokens.url(req, res), ' ',
    ':status ', tokens.status(req, res), ' ',
    ':res[content-length] ', tokens.res(req, res, 'content-length'), ' - ',
    ':res[time] ', tokens['response-time'](req,res), 'ms'
  ].join('') + ' ' + req.ip;
}, {
  skip(req, res) { return res.statusCode < 400},
  stream: errorLogStream
});