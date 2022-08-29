import { body } from 'express-validator';

export default [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Bitte gib deine Email-Adresse an.')
        .trim()
        .isEmail()
        .withMessage('Bitte gib eine gültige Email-Adresse an.')
        .normalizeEmail(),

    body('password')
        .not()
        .isEmpty()
        .withMessage('Bitte gib dein Passwort ein.')
        .trim()
        .escape()
]