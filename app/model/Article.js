const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    text: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: mongoose.SchemaTypes.Date,
        required: false
    }
});

module.exports = mongoose.model('articles', ArticleSchema);