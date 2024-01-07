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

    const [total, articles] = await Promise.all([Article.estimatedDocumentCount(), Article.find({}).skip(offset).limit(limit).sort({_id: (sort === 'asc') ? 1 : -1})]);

    res
        .status(200)
        .json({articles: articles, total: total});
});

router.get('/:id', async (req, res) => {
    await Article.findById(req.params.id)
        .then((article) => {
            res
                .status(200)
                .json({article: article, error: null});
        })
        .catch((error) => {
            console.log(error);
            res
                .status(404)
                .json({article: null, error: 'Page is not found'});
        });
});

module.exports = router;