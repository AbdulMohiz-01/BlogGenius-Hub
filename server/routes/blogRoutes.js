const express = require('express');
const router = express.Router();

const { generateBlog, retrieveBlog } = require('../controllers/blogController');

router.post('/generate', generateBlog);

router.get('/retrieve', retrieveBlog);

module.exports = router;
