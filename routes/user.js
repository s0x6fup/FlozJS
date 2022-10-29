const express = require('express');
const userController = require('../controllers/user')
const validate = require('../helpers/validate')


const router = express.Router();


router.get('/login', userController.login_form);
router.post('/login', validate.loginCheck, userController.login);
router.get('/register', userController.register_form);
router.post('/register', validate.registerCheck, userController.register);
router.get('/logout', userController.logout);
router.get('/profile', userController.profile);


module.exports = router;
