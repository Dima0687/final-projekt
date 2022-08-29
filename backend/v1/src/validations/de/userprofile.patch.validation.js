import { body } from 'express-validator';

export default [
    body('firstname')
        .trim()
        .not()
        .matches(/\d/)
        .withMessage('Der Vorname darf keine Zahlen enthalten.')
        .blacklist(/(?:\{|\[|\(|\<|\>|\)|\]|\}|\@|\$|\%)/),
        
    body('lastname')
        .trim()
        .not()
        .matches(/\d/)
        .withMessage('Der Nachname darf keine Zahlen enthalten.')
        .blacklist(/(?:\{|\[|\(|\<|\>|\)|\]|\}|\@|\$|\%)/),

    body('organizer')
        .not()
        .isEmpty()
        .withMessage('Organizer muss auf true oder false gesetzt sein.')
        .trim()
        .matches(/^true$|^false$/)
        .withMessage('Der Wert muss "true" oder "false" sein.'),

    body('street')
        .trim()
        .isLength({max: 50})
        .withMessage(''),

    body('houseNr')
        .trim()
        .isLength({min: 1, max: 3})
        .withMessage('Die Hausnummer muss zwischen 1 und 999 sein.'),
        
    body('city')
        .trim()
        .isLength({max: 32})
        .withMessage('Der Stadtname darf maximal 32 Zeichen lang sein.')
        .not()
        .matches(/\d/)
        .withMessage('Der stadtname darf keine Zahlen enthalten.'),

    body('zip')
        .trim()
        .isLength({min: 5, max: 5})
        .withMessage('Die PLZ muss 5 Zeichen lang sein.')
        .not()
        .matches(/\D/)
        .withMessage('Die PLZ muss aus Zahlen bestehen.')
]