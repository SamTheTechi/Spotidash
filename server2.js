const axios = require(`axios`);
const { error } = require("console");
const express = require(`express`);
const { url } = require("inspector");
const querystring = require("querystring");
const { fileURLToPath } = require("url");
const { threadId } = require("worker_threads");
var app = express();
var playlist_id = "1xrOkOBLj4U5xBZ9I54svM";
var user_id = "31il5tmr4tphamlnxvuqj3btv2sy";
var client_id = "80201b446e0445c9b94eff48aaa32f5e";
var redirect_uri = "http://localhost:5000/callback";
var client_secret = "cf112194a22b45109b223f600eece71c";
var access_token = "";
const link =
  "BQCEXuO37YIn9XGxx4kaL3uY7dowGPr8aw0r4Bsd144cjuco8OtflkS6a8cdjGe-WA9MZIemLzq7QUqz3seXl-K1vjNfUrNKbDihNVk5fhx8O4sfuon9uyzTpOs64nxeOPCRzcTzPV3R0Kaq3ajOaZFAFsRWJTAlXweOj0HFuzFeDPSUBxjWY_mV994-aL6i-GgLJ9RHkhPwsiEiwfSNVY9Wyf5utXmN7QAswepckwWL1680cpUevo0mDb5MAgubiMIN1gOIHGNNRCS-_ETppcsmdb395zI8cq4";
const header = {
  headers: {
    Authorization: `Bearer ${link}`,
    "Content-Type": "application/json",
  },
};

https: function generateRandomString(length) {
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
      res.json({ token: access_token });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
});

app.get(`/data`, async (req, res) => {
  try {
    let offset = 0;
    var allLikedTracks = [];
    do {
      var response = await axios.get(
        `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`,
        header
      );
      const tracks = response.data.items;
      const blendTracks = getID(tracks);
      allLikedTracks = allLikedTracks.concat(blendTracks);
      offset += 50;
    } while (offset < response.data.total);
    res.json({ allLikedTracks });
  } catch (e) {
    throw e;
  }

  async function addTracksWithDelay(allLikedTracks, playlist_id, link) {
    try {
      for (const item of allLikedTracks) {
        try {
          let response = await axios.post(
            `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            {
              uris: [item],
              position: 0,
            },
            {
              headers: {
                Authorization: `Bearer ${link}`,
                "Content-Type": "application/json",
              },
            }
          );

          await new Promise((resolve) => setTimeout(resolve, 50));

          console.log(`Track added: ${item}`);
        } catch (e) {
          if (!res.headersSent) {
            console.error("Error adding track:", e);
            res.status(500).json({ error: "Internal Server Error" });
          }
        }
      }

      res.json({ allLikedTracks });
      console.log(`All songs added`);
    } catch (e) {
      console.error("Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  addTracksWithDelay(allLikedTracks, playlist_id, link);
});

app.listen(5000, () => {
  console.log("Server Up and running");
});

const getID = (items) => {
  return items.map((item) => {
    return item.track.uri;
  });
};
