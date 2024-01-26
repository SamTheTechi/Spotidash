require(`dotenv`).config();
const { StatusCode } = require(`http-status-codes`);
const axios = require(`axios`);
const querystring = require("querystring");

var client_id = "80201b446e0445c9b94eff48aaa32f5e";
var client_secret = "cf112194a22b45109b223f600eece71c";
var redirect_uri = "http://localhost:5000/callback";
let access_token = ``;
let userId = "";

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
    "user-read-private user-library-read playlist-read-private playlist-modify-private playlist-modify-public user-top-read ";

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
      res.status(200).redirect(redirect_dashboard);
      console.log({ token: access_token });
    } catch (e) {
      console.error(e);
      res.status(500).res.response(redirect_tryagain);
    }
  }
};

const tokenEndpoint = async (req, res) => {
  res.json({ access_token });
};

const UserIdEndpoint = async (req, res) => {
  const receivedData = await req.body.id;
  userId = receivedData;
  res.json({ userId: receivedData });
};

const WeeklyplaylistEndpoint = async (req, res) => {
  const Name = await req.body.name;
  const Description = await req.body.description;
  const weeklyPlaylistId = await req.body.weeklyPlaylistId;
  console.log(Name);
  console.log(weeklyPlaylistId);
  console.log(Description);

  const Createplaylist = async () => {
    try {
      await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: Name,
          description: Description,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      // Fetchplaylist();
    } catch (e) {
      throw e;
    }
  };
  let newWeeklyPlaylist = "";
  const Fetchplaylist = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      newWeeklyPlaylist = response.data.items
        .filter((items) => items.name === Name)
        .map((item) => item.id)[0];
    } catch (e) {
      throw e;
    }
  };
  let weeklyPlaylistSongs = [];
  const FetchSWeeklySongs = async () => {
    try {
      let offset = 0;
      do {
        var response = await axios.get(
          `https://api.spotify.com/v1/playlists/${weeklyPlaylistId}/tracks?limit=50&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const data = response.data.items;
        const songs = map((items) => items.track.uri);
        weeklyPlaylistSongs = weeklyPlaylistSongs.concat(songs);
        offset += 50;
      } while (offset < response.data.total);
      console.log(weeklyPlaylistSongs);
    } catch (e) {
      throw e;
    }
  };

  const AddSongs = async (songsToBeAdded, newWeeklyPlaylist, access_token) => {
    try {
      songsToBeAdded.map(async (item) => {
        try {
          if (item === null) {
            return;
          }
          let response = await axios.post(
            `https://api.spotify.com/v1/playlists/${newWeeklyPlaylist}/tracks`,
            {
              uris: [item],
              position: 0,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          let track = item.split(":")[2];
          await new Promise((resolve) => setTimeout(resolve, 50));
          console.log(`TrackAdded -> ${track}`);
          return response;
        } catch (e) {
          throw e;
        }
      });
    } catch (e) {
      throw e;
    }
  };
  Createplaylist();
  // FetchSWeeklySongs();
  // AddSongs(weeklyPlaylistSongs, newWeeklyPlaylist, access_token);
};

module.exports = {
  login,
  callback,
  tokenEndpoint,
  UserIdEndpoint,
  WeeklyplaylistEndpoint,
};
