const express = require('express');
const postController = require('../controllers/post')

const router = express.Router();

router.get('/', postController.post_list);
router.get('/create', postController.post_create_form)
router.post('/create', postController.post_create)
router.get('/:id', postController.post_details);
router.delete('/:id', postController.post_delete)

module.exports = router;
