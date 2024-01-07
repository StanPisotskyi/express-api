const { Router } = require('express');
const Article = require("../../model/Article");
const router = Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    let sort = req.query.sort;
    let page = req.query.page;

    page = parseInt(page);

    if (!sort) {
        sort = 'DESC'
    }

    if (page < 1) {
        page = 1;
    }

    sort = sort.toLowerCase();

    const limit = 5;
    const offset = (page - 1) * limit;

    const total = await Article.estimatedDocumentCount();
    const articles = await Article.find({}).skip(offset).limit(limit).sort({
        _id: (sort === 'asc') ? 1 : -1
    });
    res.header(200);
    res.json({articles: articles, total: total});
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.header(404);
        res.json({article: null, error: 'Page is not found'});
    } else {
        const article = await Article.findById(id).exec();

        if (!article) {
            res.header(404);
            res.json({article: null, error: 'Page is not found'});
        } else {
            res.header(200);
            res.json({article: article, error: null});
        }
    }
});

module.exports = router;