const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    
    // Security: Prevent path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return res.status(403).send("Forbidden");
    }

    const filepath = path.join(__dirname, 'files', filename);

    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send("HTTP 404: File not found");
        }

        // Determine Content-Type based on extension
        const ext = path.extname(filename).toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === '.txt') contentType = 'text/plain';
        if (ext === '.html') contentType = 'text/html';
        if (ext === '.md') contentType = 'text/markdown';

        res.setHeader('Content-Type', contentType);

        // Streaming takes place here
        const stream = fs.createReadStream(filepath);
        
        stream.on('error', (streamErr) => {
            console.error("Streaming error:", streamErr);
            if (!res.headersSent) {
                res.status(500).send("Internal Server Error during streaming.");
            }
        });

        // Pipe the streamed data directly to the client response
        stream.pipe(res);
    });
});

app.listen(PORT, () => {
    console.log(`Part B File Server running at http://localhost:${PORT}`);
});
