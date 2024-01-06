const { Router } = require('express');
const passport = require('passport');
const router = Router();

router.post(
    '/',
    passport.authenticate('register', { session: false }),
    async (req, res, next) => {
        res.json({
            status: true,
            user: {
                id: req.user._id,
                firstName: req.user.firstName,
                lastName: ('lastName' in req.user) ? req.user.lastName : null,
                email: req.user.email,
                createdAt: req.user.createdAt
            }
        });
    }
);

module.exports = router;