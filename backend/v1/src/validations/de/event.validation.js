import { body, check } from 'express-validator';

export default [
    body('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Bitte gib den Namen der Veranstaltung an')
        .isLength({max: 50})
        .withMessage('Der Titel darf maximal 50 Zeichen lang sein.'),
    
    body('description')
        .trim()
        .isLength({max: 250})
        .withMessage('Die Beschreibung darf maximal 250 Zeichen lang sein.')
        .blacklist(/(?:\{|\[|\<|\>|\]|\}|\$)/),
    
    body('location.street')
        .trim()
        .isLength({max: 50})
        .withMessage('Der Straßenname darf maximal 50 Zeichen enthalten.'),
    
    body('location.houseNr')
        .trim()
        .isLength({min: 1, max: 4}) // 999 + Buchstabe
        .withMessage('Die Hausnummer muss zwischen 1 und 999 sein.'),
    
    body('location.city')
        .trim()
        .isLength({max: 32})
        .withMessage('Der Stadtname darf maximal 32 Zeichen lang sein.')
        .not()
        .matches(/\d/)
        .withMessage('Der Stadtname darf keine Zahlen enthalten.'),
    
    body('location.zip')
        .trim()
        .isLength({min: 5, max: 5})
        .withMessage('Die PLZ muss 5 Zeichen lang sein.')
        .not()
        .matches(/\D/)
        .withMessage('Die PLZ muss aus Zahlen bestehen.'),
    
    body('host')
        .not()
        .isEmpty()
        .withMessage('Bitte gib den Name des Hosts ein.')
        .trim()
        .isLength({min: 3, max: 50})
        .withMessage('Der Hostname muss muss zwischen 3 und 50 Zechen lang sein.')
        .not()
        .matches(/\W!\s/)
        .withMessage('Der Hostname darf keine Sonderzeichen enthalten.')
        .blacklist('{[(<@$%>)]}'),

        body('eventTime')
        .not()
        .isEmpty()
        .withMessage('Bitte gib die Uhrzeit ds Events an.')
        .matches(/^(10|11|12|13|14|15|16|17|18|19|20|21|22|23|[1-9]):[0-5][0-9]$/)
        .withMessage('Bitte gib eine gültige Uhrzeit an.'),

    body('cancelled')
        .not()
        .isEmpty()
        .withMessage('Cancelled muss auf true oder false gesetzt sein.')
        .trim()
        .toBoolean({strict: true})
        .withMessage('Der Wert muss "true" oder "false" sein.'),
    
    body('postponed')
        .not()
        .isEmpty()
        .withMessage('Postponed muss auf true oder false gesetzt sein.')
        .trim()
        .toBoolean({strict: true})
        .withMessage('Der Wert muss "true" oder "false" sein.'),
    
    body('maxParticipants')
        .not()
        .matches(/\D/)
        .withMessage('Die Teilnehmerzahl darf nur aus Zahlen bestehen.')
        .isLength({max: 5})
        .withMessage('Die maximale Anzahl an Teilnehmern beträgt 99999'),
    
    body('website')
        .trim()
        .blacklist('{[(<@$%>)]}')
]