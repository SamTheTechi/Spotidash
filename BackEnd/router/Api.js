const express = require(`express`);
const router = express.Router();
const {
  tokenEndpoint,
  WeeklyplaylistEndpoint,
  BlendplaylistEndpoint,
  UserIdEndpoint,
} = require(`../controller/Oauth`);

router.get(`/clintToken`, tokenEndpoint);
router.post(`/UserId`, UserIdEndpoint);
router.post(`/Weeklyplaylist`, WeeklyplaylistEndpoint);
router.post(`/blendplaylist`, BlendplaylistEndpoint);

module.exports = router;
