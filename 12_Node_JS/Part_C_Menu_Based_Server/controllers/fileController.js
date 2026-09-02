const { streamFile, downloadFile } = require('../services/fileService');
const { logRequest } = require('../services/logger');
const { generateId } = require('../utils/idGenerator');

function handleViewFile(req, res) {
    const filename = req.params.filename;
    const id = generateId();
    streamFile(filename, res, id, logRequest);
}

function handleDownloadFile(req, res) {
    const filename = req.params.filename;
    const id = generateId();
    downloadFile(filename, res, id, logRequest);
}

module.exports = { handleViewFile, handleDownloadFile };
