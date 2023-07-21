const express = require('express');
const router = express.Router();

const { createPost,getPosts,getPost,editPost,deletePost } = require('../controller/post');
const { upload } = require('../helpers/multer');
const {verifyUser} = require('../controller/user');

router.post('/create', verifyUser, upload.single('file'), createPost);
router.get('/getPosts',getPosts)
router.get('/getPostById/:id',getPost)
router.patch('/editpost/:id',editPost)
router.delete('/deletepost/:id',deletePost)

module.exports = router;
