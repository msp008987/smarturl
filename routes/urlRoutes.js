const express = require('express');
const router = express.Router();
const { createShortUrl } = require('../controllers/urlController');

router.post('/shorten', createShortUrl);

module.exports = router;
