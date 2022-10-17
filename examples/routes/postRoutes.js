const express = require('express');
const postController = require('../controllers/postController') // controller that handles the logic of each route

// we attach the route handlers to router instead of app, which is a sub-app of app of sorts
const router = express.Router(); // creates a new instance of Router object

router.get('/', postController.post_create_form)
router.post('/', postController.post_create)
router.get('/:id', postController.post_details);
router.delete('/:id', postController.post_delete)

module.exports = router; // finally we export router so the app can use these route handlers
