
const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
    res.send('<h1>Home</h1><p>Available routes: /about, /students, /contact</p>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About</h1><p>Express routing lab.</p>');
});

app.get('/students', (req, res) => {
    res.json([{ name: 'Arun' }, { name: 'Bala' }]);
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact</h1><p>Email: admin@college.edu</p>');
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
