const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const port = 3000;
const baseUrl = '/api/v1';

require('./db/connection');
require('./security/auth');

const pingRouter = require('./routes/ping');
const registerRouter = require('./routes/security/register');
const loginRouter = require('./routes/security/login');
const profileRouter = require('./routes/profile');
const articleRouter = require('./routes/articles/router');
const articleSecuredRouter = require('./routes/articles/securedRouter');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(req.method + ':' + req.url);
    next();
});

app.use(`${baseUrl}/ping`, pingRouter);
app.use(`${baseUrl}/register`, registerRouter);
app.use(`${baseUrl}/login`, loginRouter);
app.use(`${baseUrl}/articles`, articleRouter);
app.use(`${baseUrl}/profile`, passport.authenticate('jwt', { session: false }), profileRouter);
app.use(`${baseUrl}/articles`, passport.authenticate('jwt', { session: false }), articleSecuredRouter);

app.listen(port, function () {
    console.log(`Express app listening on port ${port} !`);
});