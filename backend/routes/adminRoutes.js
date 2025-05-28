// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const { protect, adminOnly } = require('../middleware/authMiddleware'); // or wherever you defined it
const { getAllUsers } = require('../controllers/adminController');

router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;
