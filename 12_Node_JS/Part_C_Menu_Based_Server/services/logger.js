const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDir, 'requests.log');

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

function logRequest(id, filename, statusCode, statusMessage) {
    const now = new Date();
    // Format Date: DD/MM/YYYY
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    // Format Time: HH:MM:SS
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });

    const logEntry = `ID: ${id} | Date: ${dateStr} | Time: ${timeStr} | File: ${filename} | Status: ${statusCode} ${statusMessage}\n`;

    fs.appendFile(logFile, logEntry, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
}

module.exports = { logRequest };
