require('dotenv').config();
const express = require('express')
const { initDatabase } = require('./service/db');
const app = express()                       
const port = process.env.PORT || 3000;
const addRoutes = require('./route');

app.use(express.json());                    


initDatabase((err, result) => {
    if(err){
        return console.error(err);
    }
    const { db, MonkeyModel, BananaModel } = result;

    addRoutes(app, db, MonkeyModel, BananaModel);

    app.use((req, res, next) => {
        return res.status(404).json({
            error: `Endpoint or method not found: ${req.method} ${req.originalUrl}`
        });
    });

    app.listen(port, function () { 
        console.log(`Server running on http://localhost:${port}`);
    });
});