const express = require('express');
const router = express.Router();
const authenticationValidation = require('../middleware/authenticationValidation');
const dashboardController = require('../controllers/dashboardController');
const userParser = require('../middleware/uploadUserImage');
const postParser = require('../middleware/uploadPostImage');

router.get('/profile', authenticationValidation.protect, dashboardController.getDasboardUserProfile);

router.get('/home/posts', authenticationValidation.protect, dashboardController.getDashboardHomePosts);

router.get('/user/posts', authenticationValidation.protect, dashboardController.getDasboardUserPosts);

router.get('/reactions/likes', authenticationValidation.protect, dashboardController.getDashboardUserReactionsLikes);

router.get('/reactions/comments', authenticationValidation.protect, dashboardController.getDashboardUserReactionsComments);

router.get('/singlePost/edit/:postId', authenticationValidation.protect, dashboardController.getDashboardSinglePostEdit);

router.get('/changeEmail/:token', dashboardController.changeEmail);

router.patch('/profile/image', authenticationValidation.protect, userParser.single('image'), dashboardController.updateProfileImage);

router.patch('/profile/info', authenticationValidation.protect, dashboardController.updateProfileInfo);

router.patch('/profile/edit/email', authenticationValidation.protect, dashboardController.sendChangeEmailLink);

router.patch('/posts/edit/image', authenticationValidation.protect, postParser.single('image'), dashboardController.updatePostImage);

router.patch('/posts/edit/info', authenticationValidation.protect, dashboardController.updatePostInfo);

router.post('/profile/delete', authenticationValidation.protect, dashboardController.deleteUserProfile);

module.exports = router;
