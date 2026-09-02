const express = require('express');
const path = require('path');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const PORT = 3001;

// Serve static client UI files
app.use(express.static(path.join(__dirname, 'public')));

// Register API routes
app.use('/api/file', fileRoutes);

app.listen(PORT, () => {
    console.log(`Part C Menu Based Server running at http://localhost:${PORT}`);
});
