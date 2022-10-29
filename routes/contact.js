const express = require('express');
const contactController = require('../controllers/contact')
const validate = require('../helpers/validate')


const router = express.Router();


router.get('/', contactController.contactForm);
router.post('/', validate.contactCheck, contactController.messageCreate);
router.get('/messageList', contactController.messageList);
router.get('/message', contactController.messagePage);


module.exports = router;
