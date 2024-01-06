const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.header(200)
    res.json({action: 'ping'});
});

module.exports = router;