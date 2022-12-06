const express = require('express');
const bot = require('./src/bot');

const app = express();

app.get('/', async (req, res) => {
    const response = await bot();
    res.send('Done');
});

const PORT = 4000;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening on port ${PORT}...`);
})