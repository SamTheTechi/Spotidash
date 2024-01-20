require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);
const token = `BQCnxqkHpTOPni0jkAE7aiJCl-HrsTpuzJVjr9jEqH09jCsKdRb2iVkh6groI8tJ2M0_ppiu4h8eCfoNWO_ikzTzFbQAiSsZNEX0LeYIOsoRLos0USsICQ70Z8MEr5_uuCEL4W4I0XfKaZ2vZBZuizjcxT1l-NqfjkC_7c0rVHvFSzbJ1oMvtbAa9cQhRtm4NPTwgHlHsfp4GIDVgWfqGmCHi3SpD_uy2fwVivnfiB5Cw21ns1WSxwrO03WLIyx-2gE682k2rI7s8JlYEgf-3RFC5BE4deF11WA`;

const port = process.env.LocalPort || process.env.PORT;

const axios = require(`axios`);
const express = require(`express`);
const querystring = require("querystring");
const { threadId } = require("worker_threads");
var client_id = "80201b446e0445c9b94eff48aaa32f5e";
var client_secret = "cf112194a22b45109b223f600eece71c";
var redirect_uri = "http://localhost:5000/callback";
var access_token = "";

const app = express();
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

app.get("/login", (req, res) => {
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
});

app.get("/callback", async function (req, res) {
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
      res.redirect("http://localhost:5000/data");
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
});

app.post;

app.listen(port, () => console.log(`Server Running on port ${port}`));
