// nodejs build in
import rfs from 'rotating-file-stream';
import path from 'path';
import { fileURLToPath } from 'url';

// create error log stream
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const errorLogStream = rfs.createStream('errors.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '..', 'logs')
});

export default errorLogStream;