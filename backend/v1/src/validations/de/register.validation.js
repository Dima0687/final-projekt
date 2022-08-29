import { body } from 'express-validator';

export default [

    body('username')
        .not()
        .isEmpty()
        .withMessage('Bitte gib einen enuzernamen an.')
        .trim()
        .isLength({min: 3, max: 50})
        .withMessage('Der Username muss muss zwischen 3 und 50 Zeichen lang sein.')
        .blacklist('{[(<@$%>)]}'),

    body('email')
        .not()
        .isEmpty()
        .withMessage('Bitte gib deine Email an.')
        .trim()
        .isEmail()
        .withMessage('Bitte gib eine gültige Email-Adresse an.')
        .normalizeEmail(),

    body('password')
        .not()
        .isEmpty()
        .withMessage('Bitte gib ein Passwort ein.')
        .trim()
        .isLength({min: 10})
        .withMessage('Das Passwort muss mindestens 10 Zeichen lang sein.')
        .isStrongPassword()
        .withMessage('Das Passwort muss folgendes beinhalten: min. 1 Großbuschstaben, min. 1 Kleinbuschstaben, min. 1 Zahl, min. 1 Sonderzeichen.')
        .escape()
]