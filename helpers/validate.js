const { body } = require('express-validator')


const registerCheck = [
    // username
    body('username').exists().withMessage('username missing'),
    body('username').not().isEmpty().withMessage('Username can\'t be empty'),

    // email
    body('email').exists().withMessage('email missing'),
    body('email').not().isEmpty().withMessage('email can\'t be empty'),
    body('email').isEmail().withMessage('email is invalid'),

    // password
    body('password').exists().withMessage('password missing'),
    body('password').not().isEmpty().withMessage('password can\'t be empty'),

    // password confirmation
    body('passwordConfirm').exists().withMessage('password confirmation missing'),
    body('passwordConfirm').not().isEmpty().withMessage('password confirmation can\'t be empty')
]


const loginCheck = [
    // email
    body('email').exists().withMessage('email missing'),
    body('email').not().isEmpty().withMessage('email can\'t be empty'),
    body('email').isEmail().withMessage('email is invalid'),

    // password
    body('password').exists().withMessage('password missing'),
    body('password').not().isEmpty().withMessage('password can\'t be empty'),
]


const contactCheck = [
    // email
    body('email').exists().withMessage('email missing'),
    body('email').not().isEmpty().withMessage('email can\'t be empty'),
    body('email').isEmail().withMessage('email is invalid'),

    // message
    body('message').exists().withMessage('message missing'),
    body('message').not().isEmpty().withMessage('message can\'t be empty'),
]


const commentCheck = [
    // TODO
]


function hasSpecialChars(str) {
    let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]+/;
    if(specialChars.test(str)){
      return true;
    }

    return false;
}


module.exports = {
    registerCheck,
    loginCheck,
    contactCheck,
    hasSpecialChars
}
