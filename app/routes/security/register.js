const { Router } = require('express');
const passport = require('passport');
const router = Router();

router.post(
    '/',
    passport.authenticate('register', { session: false }),
    async (req, res, next) => {
        res.json({
            status: true,
            user: req.user
        });
    }
);

module.exports = router;