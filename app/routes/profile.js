const { Router } = require('express');
const UserModel = require("../model/User");
const router = Router();

router.get(
    '/',
    async (req, res, next) => {
        const _id = req.user._id;
        await UserModel.findOne({ _id })
            .then((user) => {
                res
                    .status(200)
                    .json({
                    user: user
                });
            }).catch((error) => {
                console.log(error);
                res
                    .status(401)
                    .json({error: 'Unauthorized'});
            });
    }
);

module.exports = router;