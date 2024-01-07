const { Router } = require('express');
const Article = require("../../model/Article");
const User = require("../../model/User");
const router = Router();

router.post('/', async (req, res) => {
    const { title, description, text } = req.body;
    const _id = req.user._id;
    const author = await User.findOne({ _id });

    if (!title || !description || !text) {
        res.header(400);
        res.json({
            article: null,
            error: 'Bad request'
        });
    } else if (!author) {
        res.header(401);
        res.json({
            article: null,
            error: 'Unauthorized'
        });
    } else {
        const article = await Article.create({ title, description, text, author });
        article.save();

        res.header(201)
        res.json({
            article: article,
            error: null
        });
    }
});

module.exports = router;