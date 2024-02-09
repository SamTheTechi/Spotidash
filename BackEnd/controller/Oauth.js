require(`dotenv`).config();

const querystring = require("querystring");
const mongoose = require(`mongoose`);
const axios = require(`axios`);
const Database = require(`../model/User`);
const {
  Createplaylist,
  FetchAllUserPlaylist,
  FetchSongs,
  AddSongsIntoPlaylist,
} = require("./function");

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

const redirect_uri = "http://localhost:5000/callback";
const redirect_dashboard = process.env.dashboardpage;
const redirect_tryagain = process.env.tryagain;

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
      console.log(`Access_token Recived`);
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
  try {
    const IsUserPresent = await Database.findOne({ UserKey: userId });
    if (!IsUserPresent) {
      await Database.create({ UserKey: userId });
      console.log(`user created`);
    }
  } catch (e) {
    return;
  }
  res.json({ userId: receivedData });
};

const WeeklyplaylistEndpoint = async (req, res) => {
  const Name = await req.body.name;
  const Description = await req.body.description;
  const weeklyPlaylistId = await req.body.weeklyPlaylistId;

  const PlaylistExist = await Database.findOne({
    UserKey: userId,
    "Weekly.Exist": false,
  });

  const weeklyPlaylistExist = await Database.findOne({
    UserKey: userId,
    "Weekly.Exist": true,
  });

  const val = await FetchAllUserPlaylist(access_token);
  const data = await val
    .filter((items) => items.id === weeklyPlaylistExist.Weekly.PlaylistID)
    .map((item) => item.id)[0];

  if (PlaylistExist || !data) {
    const newWeeklyPlaylist = await Createplaylist(
      Name,
      Description,
      userId,
      access_token
    );
    console.log(`new playlist created for user ${userId}`);

    const PlaylistSongs = await FetchSongs(
      weeklyPlaylistId,
      50,
      0,
      access_token
    );

    await AddSongsIntoPlaylist(PlaylistSongs, newWeeklyPlaylist, access_token);

    await Database.findOneAndUpdate(
      {
        UserKey: userId,
        "Weekly.Exist": true,
      },
      {
        $set: {
          "Weekly.PlaylistID": newWeeklyPlaylist,
        },
      }
    );

    await Database.findOneAndUpdate(
      {
        UserKey: userId,
        "Weekly.Exist": false,
      },
      {
        $set: {
          "Weekly.Exist": true,
          "Weekly.WeeklyID": weeklyPlaylistId,
          "Weekly.PlaylistID": newWeeklyPlaylist,
        },
      }
    );

    res.status(200).send(`Playlist created and songs added.`);
  } else {
    console.log("song updating");
    const PlaylistSongs = await FetchSongs(
      weeklyPlaylistExist.Weekly.PlaylistID,
      50,
      0,
      access_token
    );

    const WeeklySongs = await FetchSongs(
      weeklyPlaylistExist.Weekly.WeeklyID,
      50,
      0,
      access_token
    );

    const songsToBeAdded = WeeklySongs.map((item) => {
      const Exist = !PlaylistSongs.some((track) => track === item);
      if (Exist) return item;
      else return null;
    }).filter(Boolean);

    AddSongsIntoPlaylist(
      songsToBeAdded,
      weeklyPlaylistExist.Weekly.PlaylistID,
      access_token
    );
  }
};

const BlendplaylistEndpoint = async (req, res) => {
  const filterPlaylist = await req.body.filterlist;
  const blendPlaylist = await req.body.blendlist;
  let filterPlaylistSongs = [];
  let blendPlaylistSongs = [];

  const newBlendPlaylsit = await Createplaylist(
    `blend`,
    `newBlend`,
    userId,
    access_token
  );

  try {
    for (let item of blendPlaylist) {
      const PlaylistSongs = await FetchSongs(item, 50, 0, access_token);
      blendPlaylistSongs = blendPlaylistSongs.concat(PlaylistSongs);
    }
    for (let item of filterPlaylist) {
      const PlaylistSongs = await FetchSongs(item, 50, 0, access_token);
      filterPlaylistSongs = filterPlaylistSongs.concat(PlaylistSongs);
    }
  } catch (e) {
    console.log(`error while fetching songs`);
  }

  const songsToBeAdded = blendPlaylistSongs
    .map((item) => {
      const Exist = !filterPlaylistSongs.some((tracks) => tracks === item);
      if (Exist) return item;
      else return null;
    })
    .filter(Boolean);

  AddSongsIntoPlaylist(songsToBeAdded, newBlendPlaylsit, access_token);

  res.status(200).send(`woking?`);
};

module.exports = {
  login,
  callback,
  tokenEndpoint,
  UserIdEndpoint,
  WeeklyplaylistEndpoint,
  BlendplaylistEndpoint,
};
