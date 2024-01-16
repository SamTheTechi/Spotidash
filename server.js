const axios = require(`axios`);
const { error } = require("console");
const express = require(`express`);
const { url } = require("inspector");
const querystring = require("querystring");
const { fileURLToPath } = require("url");
const { threadId } = require("worker_threads");
var app = express();
var playlist_id = "6kQ7sSwrEXpMN68EwzIStS";
var user_id = "31il5tmr4tphamlnxvuqj3btv2sy";
var client_id = "80201b446e0445c9b94eff48aaa32f5e";
var redirect_uri = "http://localhost:5000/callback";
var client_secret = "cf112194a22b45109b223f600eece71c";
var access_token = "";
var link =
  "BQA7dHE2G0dIWdNh0Qbclv4oo2VfCHEFk70OKX4nqMJUEiKOojKeSE87qsjyXQZZ-uKa-W3cqFuCMXIrkHEMU9TvwvXKYt7fDCKuVWFW9tN1xfSUSFGUYbM3qdypminpGptv2ax6cg1Xh0X1G0CxS_MUU5faLQc2u5yr22kkv4BsjFRl8SJHmqH0ig46pRdI8ZA_f4p05dAgIFACDkb03Va50t6buGQ_qif4hO4GPSbclMFPdBLhq72wYY2b3yVqk7hg6LCPEkUN4A3cvdD5BuOn01BoYGf4LnI";
const header = {
  headers: {
    Authorization: `Bearer ${link}`,
  },
};

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
      res.json({ access_token });
      // res.redirect("http://localhost:5000/data");
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
});

app.get(`/data`, async (req, res) => {
  // try {
  //   const response = await axios.get(
  //     `https://api.spotify.com/v1/me/playlists`,
  //     header
  //   );
  //   const data = response.data.items;
  //   const blendData = blendSearch(data);
  //   const blendURLs = playlists(blendData);
  //   // res.json({ blendURLs, total: blendURLs.length });
  // } catch (e) {
  //   throw e;
  // }
  var id = `37i9dQZF1EJJDc7GxPDRjS`;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}`,
      header
    );
    const data = response.data.tracks.items;
    var blendTracks = getID(data);
  } catch (e) {
    throw e;
  }
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
    console.log(`Collected liked Tracks`);
  } catch (e) {
    throw e;
  }

  try {
    let offset = 0;
    var allBlendTrack = [];
    do {
      var response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=50&offset=${offset}`,
        header
      );
      const data = response.data.items;
      const blendSongs = getID(data);
      allBlendTrack = allBlendTrack.concat(blendSongs);
      offset += 50;
    } while (offset < response.data.total);
    console.log(`Collected Blend Tracks`);
  } catch (e) {
    throw e;
  }

  try {
    const songsToBeAdded = blendTracks
      .map((item) => {
        const likedTrackExist = !allLikedTracks.some((track) => track === item);
        const blendTrackExist = !allBlendTrack.some((track) => track === item);
        if (likedTrackExist && blendTrackExist) {
          return item;
        }
        return null;
      })
      .filter(Boolean);
    console.log(`Adding tracks`);
    songsToBeAdded.map(async (item) => {
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

        return response;
      } catch (e) {
        console.error("Error adding track:", e);
      }
    });
    res.json({ songsToBeAdded });
    console.log(`Songs added sucessfully`);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }

  // try {
  //   var createPlaylist = await axios.post(
  //     `https://api.spotify.com/v1/users/${user_id}/playlists`,
  //     {
  //       name: "SomeHowThisShitIsWoking",
  //       description: "ooga booga",
  //       public: false,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${link}`,
  //       },
  //     }
  //   );
  //   console.log(`playlistCreated`);
  //   res.json({ woking: `woking` });
  // } catch (e) {
  //   throw e;
  // }
});

app.listen(5000, () => {
  console.log("Server Up and running");
});

const getID = (items) => {
  return items.map((item) => {
    return item.track.uri;
  });
};
const blendSearch = (items) => {
  return items.filter((item) => {
    return (
      item.description.slice(2, 7) == `Blend` &&
      item.owner.display_name === `Spotify`
    );
  });
};
const playlists = (items) => {
  return items.map((item) => {
    return item.href;
  });
};

const addTracks = async (songsToBeAdded, playlist_id, link) => {
  try {
    songsToBeAdded.map(async (item) => {
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
        return response;
      } catch (e) {
        throw e;
      }
    });
  } catch (e) {
    throw e;
  }
};
