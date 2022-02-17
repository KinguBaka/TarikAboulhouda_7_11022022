// Import
const { check } = require('express-validator');

exports.verifLogin =[
    // first Name validation
    check('email').notEmpty().withMessage('Email requis !')
    .normalizeEmail().isEmail().withMessage('Doit-être un email valide !'),
    // username address validation
    check('username').isLength({min:4, max:13}).withMessage('Mauvais username renseigné (doit faire entre 4 - 13 caractéres)')
    .notEmpty().withMessage('username required')
    .matches(/^[a-zA-Z ]*$/).withMessage('Carractéres spéciaux (hors espace ) refusés !'),
    // password address validation
    check('password').notEmpty().withMessage('Mot de passe requis !')
    .isLength({min:5, max:12}).withMessage('Mauvais mot de passe renseigné (doit faire entre 5 - 12 caractéres)')
    .matches(/(?=.*?[A-Z])/).withMessage('Mauvais mot de passe renseigné (doit contenir une majuscule)')
    .matches(/(?=.*?[a-z])/).withMessage('Mauvais mot de passe renseigné (doit contenir une minuscule)')
    .matches(/(?=.*?[0-9])/).withMessage('Mauvais mot de passe renseigné (doit contenir un chiffre)')
    .not().matches(/^$|\s+/).withMessage('Mauvais mot de passe renseigné (ne dois pas contenit un espace)')
];

exports.verifModif =[
    // first Name validation
    check('email').optional()
    .normalizeEmail().isEmail().withMessage('Doit-être un email valide !'),
    // username address validation
    check('username').optional()
    .isLength({min:4, max:13}).withMessage('Mauvais username renseigné (doit faire entre 4 - 13 caractéres)')
    .matches(/^[a-zA-Z ]*$/).withMessage('Carractéres spéciaux (hors espace ) refusés !'),
    // password address validation
    check('password').optional()
    .isLength({min:5, max:12}).withMessage('Mauvais mot de passe renseigné (doit faire entre 5 - 12 caractéres)')
    .matches(/(?=.*?[A-Z])/).withMessage('Mauvais mot de passe renseigné (doit contenir une majuscule)')
    .matches(/(?=.*?[a-z])/).withMessage('Mauvais mot de passe renseigné (doit contenir une minuscule)')
    .matches(/(?=.*?[0-9])/).withMessage('Mauvais mot de passe renseigné (doit contenir un chiffre)')
    .not().matches(/^$|\s+/).withMessage('Mauvais mot de passe renseigné (ne dois pas contenit un espace)')
];

exports.verifPost = [
    // title validation
    check('title').isLength({min:2}).withMessage('Titre ou contenu trop court !')
    .notEmpty().withMessage('Paramétres manquants'),
    // comment validation
    check('content').isLength({min:2}).withMessage('Titre ou contenu trop court !')
    .notEmpty().withMessage('Paramétres manquants')
];

exports.verifComment = [
    // comment validation
    check('content').isLength({min:2}).withMessage('Titre ou contenu trop court !')
    .notEmpty().withMessage('Paramétres manquants')
];