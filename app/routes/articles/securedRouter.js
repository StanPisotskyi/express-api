const { Router } = require('express');
const Article = require("../../model/Article");
const User = require("../../model/User");
const mongoose = require("mongoose");
const router = Router();

router.post('/', async (req, res) => {
    const { title, description, text } = req.body;
    const _id = req.user._id;

    await validate(title, description, text)
        .then((isValid) => {
            if (!isValid) {
                throw new Error('Bad request');
            }

            return User.findOne({ _id });
        })
        .then((author) => {
            if (!author) {
                throw new Error('Unauthorized');
            }

            return  Article.create({ title, description, text, author });
        })
        .then((article) => {
            res
                .status(200)
                .json({
                    article: article,
                    status: 'success'
                });
        })
        .catch((error) => {
            console.log(error);
            res
                .status(400)
                .json({
                article: null,
                status: 'error'
            });
        });
});

router.put('/:id', async (req, res) => {
    const { title, description, text } = req.body;
    const _id = req.params.id;
    const author = req.user._id;
    const updatedAt = new Date();

    await validate(title, description, text)
        .then((isValid) => {
            if (!isValid) {
                throw new Error('Bad request');
            }

            return Article.findOneAndUpdate(
                {_id, author},
                {title, description, text, updatedAt},
                {new: true}
            );
        })
        .then((article) => {
            if (!article) {
                throw new Error('Access denied');
            }

            res
                .status(200)
                .json({
                    article: article,
                    status: 'success'
                });
        })
        .catch((error) => {
            console.log(error);
            res
                .status(400)
                .json({
                    article: null,
                    status: 'error'
                });
        });
});

function validate(title, description, text) {
    return new Promise((resolve, reject) => {
        resolve((title && description && text) ? 1: 0);
    });
}

module.exports = router;