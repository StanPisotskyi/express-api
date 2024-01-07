const { Router } = require('express');
const Article = require("../../model/Article");
const router = Router();

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
    res.header(200)
    res.json({articles: articles, total: total});
});

module.exports = router;