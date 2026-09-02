const express = require('express');
const router = express.Router();
const { handleViewFile, handleDownloadFile } = require('../controllers/fileController');

router.get('/view/:filename', handleViewFile);
router.get('/download/:filename', handleDownloadFile);

module.exports = router;
