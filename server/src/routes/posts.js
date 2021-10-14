const express = require('express');
const router = express.Router();
const { isAuth } = require('../middlewares/isAuth.js');
const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/posts');

router.get('/', getPosts);
router.post('/', isAuth, createPost);
router.patch('/:id', isAuth, updatePost);
router.patch('/:id/like-post', isAuth, likePost);
router.delete('/:id', isAuth, deletePost);

module.exports = router;
