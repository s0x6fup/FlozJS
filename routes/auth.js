const express = require('express');
const authController = require('../controllers/auth')
const validate = require('../helpers/validate')


const router = express.Router();


router.get('/login', authController.login_form);
router.post('/login', validate.loginCheck, authController.login);
router.get('/register', authController.register_form);
router.post('/register', validate.registerCheck, authController.register);
router.get('/logout', authController.logout);
router.get('/profile', authController.profile);


module.exports = router;
