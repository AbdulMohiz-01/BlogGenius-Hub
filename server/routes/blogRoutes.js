const express = require('express');
const router = express.Router();

const { generateBlog, retrieveBlog, deleteAllBlogs } = require('../controllers/blogController');

router.post('/generate', generateBlog);

router.get('/retrieve', retrieveBlog);

router.delete('/delete', deleteAllBlogs);


module.exports = router;
