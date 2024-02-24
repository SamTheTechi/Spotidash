const express = require(`express`);
const router = express.Router();
const {
  tokenEndpoint,
  WeeklyplaylistEndpoint,
  BlendplaylistEndpoint,
} = require(`../controller/Oauth`);

router.get(`/clintToken`, tokenEndpoint);
router.post(`/Weeklyplaylist`, WeeklyplaylistEndpoint);
router.post(`/blendplaylist`, BlendplaylistEndpoint);

module.exports = router;
