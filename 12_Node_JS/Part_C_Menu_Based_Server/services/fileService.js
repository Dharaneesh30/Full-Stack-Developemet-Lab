const fs = require('fs');
const path = require('path');

const FILES_DIR = path.join(__dirname, '..', 'files');

function getMimeType(filename) {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
        case '.txt': return 'text/plain';
        case '.html': return 'text/html';
        case '.pdf': return 'application/pdf';
        case '.jpg':
        case '.jpeg': return 'image/jpeg';
        case '.png': return 'image/png';
        case '.mp4': return 'video/mp4';
        default: return 'application/octet-stream';
    }
}

function validateFilename(filename) {
    // Prevent path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return false;
    }
    return true;
}

function streamFile(filename, res, id, logCallback) {
    if (!validateFilename(filename)) {
        logCallback(id, filename, 403, "FORBIDDEN");
        return res.status(403).send("Forbidden");
    }

    const filepath = path.join(FILES_DIR, filename);

    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            logCallback(id, filename, 404, "FILE NOT FOUND");
            return res.status(404).send("HTTP 404: File not found");
        }

        const mimeType = getMimeType(filename);
        res.setHeader('Content-Type', mimeType);

        // Streaming implementation using fs.createReadStream
        const stream = fs.createReadStream(filepath);
        
        let successLogged = false;

        stream.on('open', () => {
            logCallback(id, filename, 200, "SUCCESS");
            successLogged = true;
        });

        stream.on('error', (streamErr) => {
            console.error("Streaming error:", streamErr);
            if (!res.headersSent) {
                if (!successLogged) {
                    logCallback(id, filename, 500, "INTERNAL SERVER ERROR");
                }
                res.status(500).send("Internal Server Error during streaming.");
            }
        });

        stream.pipe(res);
    });
}

function downloadFile(filename, res, id, logCallback) {
    if (!validateFilename(filename)) {
        logCallback(id, filename, 403, "FORBIDDEN");
        return res.status(403).send("Forbidden");
    }

    const filepath = path.join(FILES_DIR, filename);

    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            logCallback(id, filename, 404, "FILE NOT FOUND");
            return res.status(404).send("HTTP 404: File not found");
        }

        res.download(filepath, filename, (downloadErr) => {
            if (downloadErr) {
                console.error("Download error:", downloadErr);
                if (!res.headersSent) {
                    logCallback(id, filename, 500, "INTERNAL SERVER ERROR");
                    res.status(500).send("Error downloading file.");
                }
            } else {
                logCallback(id, filename, 200, "SUCCESS");
            }
        });
    });
}

module.exports = { streamFile, downloadFile };
