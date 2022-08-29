// TODO[x] Querys validieren. (Wie und welche.)
// Querys: city, day, limit, page, host
import { query } from 'express-validator';
import { BadRequestError } from '../../errorHandler/index.js';
import allowedQueryKeys from '../../config/allowedQueryKeys.config.js';

export default [
    query().custom((query) => {
        for (const key of Object.keys(query)) {
            if(!allowedQueryKeys.includes(key)) {
                throw new BadRequestError(`Ungültiger Suchparameter: ${key}`);
            }
        }
        return true;
    })
];