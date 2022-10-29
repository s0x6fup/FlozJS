const express = require('express');
const commentController = require('../controllers/comment')
const validate = require('../helpers/validate')

const router = express.Router();

router.post('/:id', commentController.commentCreate);
router.get('/:id', commentController.commentsByPostId);

// router.get('/create', postController.post_create_form)
// router.post('/create', postController.post_create)
// router.get('/:id', postController.post_details);
// router.delete('/:id', postController.post_delete)

module.exports = router;
