const express = require(`express`);
const router = express.Router();
const {
  tokenEndpoint,
  UserIdEndpoint,
  WeeklyplaylistEndpoint,
} = require(`../controller/Oauth`);

router.get(`/clintToken`, tokenEndpoint);
router.post(`/UserId`, UserIdEndpoint);
router.post(`/Weeklyplaylist`, WeeklyplaylistEndpoint);

module.exports = router;
