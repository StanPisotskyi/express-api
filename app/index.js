const express = require('express');
const app = express();
const router = express.Router();

const port = 3000;
const baseUrl = '/api/v1';

require('./db/connection');

const pingRouter = require('./routes/ping');

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method + ':' + req.url);
    next();
});

app.use(`${baseUrl}/ping`, pingRouter);

app.listen(port, function () {
    console.log(`Express app listening on port ${port} !`);
});