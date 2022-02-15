// Import
const { check } = require('express-validator');

exports.form =[
    // first Name validation
    check('email').notEmpty().withMessage('email required')
    .normalizeEmail().isEmail().withMessage('must be a valid email'),
    // username address validation
    check('username').isLength({min:4, max:13}).notEmpty().withMessage('username required')
    .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
    // password address validation
    check('password').notEmpty().withMessage('password required')
    .isLength({min:4, max:8}).withMessage('password must be between 4 and 8 length')
    .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
    .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
    .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
    .not().matches(/^$|\s+/).withMessage('White space not allowed')
];