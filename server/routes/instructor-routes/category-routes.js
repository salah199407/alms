const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../../controllers/instructor-controller/course-controller');

// Get all categories
router.get('/categories', getAllCategories);

module.exports = router; 