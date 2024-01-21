require(`dotenv`).config();
const { StatusCode } = require(`http-status-codes`);
const axios = require(`axios`);
const querystring = require("querystring");

var client_id = "80201b446e0445c9b94eff48aaa32f5e";
var client_secret = "cf112194a22b45109b223f600eece71c";
var redirect_uri = "http://localhost:5000/callback";
let access_token = ``;

let generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const login = async (req, res) => {
  var state = generateRandomString(16);
  var scope =
    "user-read-private user-library-read playlist-read-private playlist-modify-private playlist-modify-public";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
};

const redirect_dashboard = process.env.dashboardpage;
const redirect_tryagain = process.env.tryagain;

const callback = async (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;
  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            encodeURIComponent(client_id) +
              ":" +
              encodeURIComponent(client_secret)
          ).toString("base64"),
      },
    };

    try {
      const response = await axios.post(
        authOptions.url,
        querystring.stringify(authOptions.form),
        {
          headers: authOptions.headers,
        }
      );
      access_token = response.data.access_token;
      console.log(access_token);
      res.status(200).redirect(redirect_dashboard);
    } catch (e) {
      console.error(e);
      res.status(500).res.response(redirect_tryagain);
    }
  }
};

const tokenEndpoint = async (req, res) => {
  res.json({ access_token });
};
module.exports = { login, callback, tokenEndpoint };
