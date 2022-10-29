const express = require('express');
const commentController = require('../controllers/comment')
const validate = require('../helpers/validate')


const router = express.Router();


router.post('/:id', commentController.commentCreate);
router.get('/:id', commentController.commentsByPostId);


module.exports = router;
