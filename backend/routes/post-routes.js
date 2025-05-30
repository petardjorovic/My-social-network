const express = require('express');
const router = express();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');
const tagController = require('../controllers/tagController');
const authenticationValidation = require('../middleware/authenticationValidation');
const postParser = require('../middleware/uploadPostImage');
const { restrict } = require('../middleware/restrict');

router.get('/', authenticationValidation.protect, restrict('admin', 'user'), postController.getAllPosts);

router.get('/tag', authenticationValidation.protect, tagController.getAllTags);

router.get('/search/:page/:limit', authenticationValidation.protect, postController.getPostsBySearch);

router.get('/:postId', authenticationValidation.protect, postController.getSinglePost);

router.get('/tag/:tagName', authenticationValidation.protect, postController.getPostsByTag);

router.get('/user/:userId', authenticationValidation.protect, postController.getPostsByUser);

router.post('/', authenticationValidation.protect, postParser.single('image'), postController.addNewPost);

router.put('/like/:postId/:userLike', authenticationValidation.protect, likeController.handlePostLike);

router.post('/comment', authenticationValidation.protect, commentController.addComment);

router.delete('/comment/:commentId', authenticationValidation.protect, commentController.deleteComment);

router.delete('/:postId/:userId', authenticationValidation.protect, postController.deleteSinglePost);

module.exports = router;
