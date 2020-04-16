const express = require('express');
const router = express.Router();

// @route GET api/corners
// @desc Test corners value retrieval
// @access Public
router.get('/', (req, res) => res.send('Corner route'));

module.exports = router;