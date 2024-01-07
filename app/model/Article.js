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

ArticleSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
}

module.exports = mongoose.model('articles', ArticleSchema);