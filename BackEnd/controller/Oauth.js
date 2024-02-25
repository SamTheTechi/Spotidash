require(`dotenv`).config();

const querystring = require('querystring');
const axios = require(`axios`);
const Database = require(`../model/User`);

const {
  Createplaylist,
  FetchAllUserPlaylist,
  FetchSongs,
  AddSongsIntoPlaylist,
} = require('./function');

let userId = ``;
let access_token = ``;

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const redirect_uri = 'http://localhost:5000/callback';

let generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const login = async (req, res) => {
  req.session.redirectUrl = req.query.redirectUrl;
  var state = generateRandomString(16);
  var scope =
    'user-read-private user-library-read playlist-read-private playlist-modify-private playlist-modify-public user-top-read ';

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
};

const callback = async (req, res) => {
  let redirectUrl = req.session.redirectUrl;
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            encodeURIComponent(client_id) + ':' + encodeURIComponent(client_secret)
          ).toString('base64'),
      },
    };

    try {
      const response = await axios.post(authOptions.url, querystring.stringify(authOptions.form), {
        headers: authOptions.headers,
      });
      access_token = response.data.access_token;
      res.status(200).redirect(`${redirectUrl}/dashboard`);
    } catch (e) {
      console.error(e);
      res.status(500).redirect(`${redirectUrl}/login`);
    }
    req.session.access_token = access_token;
  }
};

const tokenEndpoint = async (req, res) => {
  res.json({ access_token });
};

const UserIdEndpoint = async (req, res) => {
  const receivedData = req.body.id;
  userId = receivedData;
  req.session.userId = receivedData;

  try {
    const PlaylistExist = await Database.findOne({ UserKey: userId });
    if (!PlaylistExist) {
      await Database.create({ UserKey: userId });
      console.log(`user created`);
    }
    if (PlaylistExist && PlaylistExist.Weekly.Exist === true) {
      const PlaylistSongs = await FetchSongs(PlaylistExist.Weekly.PlaylistID, 50, 0, access_token);
      const WeeklySongs = await FetchSongs(PlaylistExist.Weekly.WeeklyID, 50, 0, access_token);
      const songsToBeAdded = WeeklySongs.map((item) => {
        const Exist = !PlaylistSongs.some((track) => track === item);
        if (Exist) return item;
        else return null;
      }).filter(Boolean);
      AddSongsIntoPlaylist(songsToBeAdded, PlaylistExist.Weekly.PlaylistID, access_token);
      console.log(`weekly updated`);
    }
    //   if (PlaylistExist && PlaylistExist.Blend !== null) {
    //     // const val = await FetchAllUserPlaylist(access_token);
    //     // const blendPlaylistIDs = PlaylistExist.Blend.map((item) => item.PlaylistID);
    //     // const yoi = val.map((item) => item.id).filter((item) => blendPlaylistIDs.includes(item));

    //     // for(let item of yoi){
    //     //   await Database.findOneAndUpdate(
    //     //     {
    //     //       UserKey: userId,
    //     //     },
    //     //     $pop:{

    //     //     },
    //     //   )
    //     // }

    //     for (let items of PlaylistExist.Blend) {
    //       let filterPlaylistSongs = [];
    //       let blendPlaylistSongs = [];
    //       try {
    //         for (let item of items.selectedBlends) {
    //           const PlaylistSongs = await FetchSongs(item, 50, 0, access_token);
    //           blendPlaylistSongs = blendPlaylistSongs.concat(PlaylistSongs);
    //         }
    //         for (let item of items.selectedFilter) {
    //           const PlaylistSongs = await FetchSongs(item, 50, 0, access_token);
    //           filterPlaylistSongs = filterPlaylistSongs.concat(PlaylistSongs);
    //         }
    //       } catch (e) {
    //         console.log(`error while fetching songs`);
    //       }

    //       const songsToBeAdded = blendPlaylistSongs
    //         .map((item) => {
    //           const Exist = !filterPlaylistSongs.some((tracks) => tracks === item);
    //           if (Exist) return item;
    //           else return null;
    //         })
    //         .filter(Boolean);
    //       console.log(`filterblend updated of ID ${items.PlaylistID}`);
    //       AddSongsIntoPlaylist(songsToBeAdded, items.PlaylistID, access_token);
    //     }
    //   }
  } catch (e) {
    return;
  }
  res.json({ userId: receivedData });
};

const WeeklyplaylistEndpoint = async (req, res) => {
  try {
    const Name = await req.body.name;
    const Description = await req.body.description;
    const weeklyPlaylistId = await req.body.weeklyPlaylistId;

    const PlaylistExist = await Database.findOne({
      UserKey: userId,
      'Weekly.Exist': false,
    });

    const weeklyPlaylistExist = await Database.findOne({
      UserKey: userId,
      'Weekly.Exist': true,
    });

    const val = await FetchAllUserPlaylist(access_token);
    const PlaylistExistID = await val
      .filter((items) => items.id === weeklyPlaylistExist?.Weekly.PlaylistID)
      .map((item) => item.id)[0];

    if (PlaylistExist || !PlaylistExistID) {
      const newWeeklyPlaylist = await Createplaylist(Name, Description, userId, access_token);
      console.log(`new playlist created for user ${userId}`);

      const PlaylistSongs = await FetchSongs(weeklyPlaylistId, 50, 0, access_token);

      await Database.findOneAndUpdate(
        {
          UserKey: userId,
          'Weekly.Exist': true,
        },
        {
          $set: {
            'Weekly.PlaylistID': newWeeklyPlaylist,
          },
        }
      );

      await Database.findOneAndUpdate(
        {
          UserKey: userId,
          'Weekly.Exist': false,
        },
        {
          $set: {
            'Weekly.Exist': true,
            'Weekly.WeeklyID': weeklyPlaylistId,
            'Weekly.PlaylistID': newWeeklyPlaylist,
          },
        }
      );

      await AddSongsIntoPlaylist(PlaylistSongs, newWeeklyPlaylist, access_token);

      res.status(200).send(`Playlist created and songs added.`);
    } else {
      console.log('weekly already setuped');
    }
  } catch (e) {
    throw e;
  }
};

const BlendplaylistEndpoint = async (req, res) => {
  // const { access_token, userId } = req.session;
  try {
    const blendPlaylist = await req.body.blendlist;
    let filterPlaylist = await req.body.filterlist;

    let filterPlaylistSongs = [];
    let blendPlaylistSongs = [];

    const BlendData = await Database.findOne({
      UserKey: userId,
    });
    if (BlendData?.Blend.length < 3 || BlendData?.Blend.length === (null || undefined)) {
      const currenDate = new Date();
      ISTtime = currenDate.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      });

      const newBlendPlaylist = await Createplaylist(
        `Filtered_blend created at ${ISTtime}`,
        `your selected blends, you can change info as you want`,
        userId,
        access_token
      );

      await Database.findOneAndUpdate(
        {
          UserKey: userId,
        },
        {
          $push: {
            Blend: {
              selectedBlends: blendPlaylist,
              selectedFilter: filterPlaylist,
              PlaylistID: newBlendPlaylist,
            },
          },
        }
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
          const ExistFilter = !filterPlaylistSongs.some((tracks) => tracks === item);
          const ExistBlend = !blendPlaylistSongs.some((tracks) => tracks === item);
          if (ExistBlend && ExistBlend) return item;
          else return null;
        })
        .filter(Boolean);

      AddSongsIntoPlaylist(songsToBeAdded, newBlendPlaylist, access_token);

      res.status(200).send(`woking?`);
    } else {
      console.log(`too many request`);
    }
  } catch (e) {
    throw e;
  }
};

module.exports = {
  login,
  callback,
  tokenEndpoint,
  WeeklyplaylistEndpoint,
  BlendplaylistEndpoint,
  UserIdEndpoint,
};
