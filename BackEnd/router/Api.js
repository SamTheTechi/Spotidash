const express = require(`express`);
const router = express.Router();
const { tokenEndpoint } = require(`../controller/Oauth`);

router.get(`/clintToken`, tokenEndpoint);

module.exports = router;
