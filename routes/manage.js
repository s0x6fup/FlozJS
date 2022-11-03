const express = require('express');
const manageController = require('../controllers/manage')
const validate = require('../helpers/validate')


const router = express.Router();


router.get('/', manageController.usersList);
router.post('/role', validate.roleUpdateCheck, manageController.updateRole);
router.post('/deleteUserConfirm', validate.deleteUserConfirmCheck, manageController.deleteUserConfirm);
router.post('/deleteUser', validate.deleteUserCheck, manageController.deleteUser);


module.exports = router;
