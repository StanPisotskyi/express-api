const { Router } = require('express');
const UserModel = require("../model/User");
const router = Router();

router.get(
    '/',
    async (req, res, next) => {
        const _id = req.user._id;
        const user = await UserModel.findOne({ _id });

        res.json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: ('lastName' in user) ? user.lastName : null,
                email: user.email,
                createdAt: user.createdAt
            }
        })
    }
);

module.exports = router;