const mongoose = require("mongoose");

mongoose.connect('mongodb://mongouser:password@mongo:27017/express-api')
    .then(() => console.log('Connected to mongodb!'))
    .catch(error => console.log(error));

mongoose.Promise = global.Promise;