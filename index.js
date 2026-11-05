require('dotenv').config();
const { initDatabase } = require('./db');
const express = require('express');
const { addRoutes } = require('./route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

addRoutes(app);

initDatabase((err, result) => {
    if (err) {
        return console.error(err);
    }
    const { app, majmok, bananok } = result;
    addRoutes(app, majmok, bananok);
    app.use((req, res) => {

        return res.status(404).json({ error: `Endpoint or method not found:'${req.method} ${req.originalUrl}'` });

    })





    app.listen(PORT, function () {
        console.log(`Server running on http://localhost:${PORT}`);
    })


})
