require('dotenv').config();
const express = require('express');
const { addRoutes } = require('./route/index');

const app = express();

app.use(express.json());


addRoutes(app);


app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    res.status(404).json({
        error: 'Not found',
        method: req.method,
        path: req.originalUrl
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`);
});
