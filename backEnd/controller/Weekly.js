require(`dotenv`).config();
const Database = require(`../model/UserInfo`);

const {
  Createplaylist,
  FetchAllUserPlaylist,
  FetchSongs,
  AddSongsIntoPlaylist,
} = require('../lib/SpotiFunc');

const WeeklyplaylistEndpoint = async (req, res) => {
  try {
    const Name = await req.body.name;
    const Description = await req.body.description;
    const weeklyPlaylistId = await req.body.weeklyPlaylistId;
    const access_token = await req.body.access_token;
    const userID = await req.body.userID;
    console.log(userID);

    const PlaylistExist = await Database.findOne({
      userKey: userID,
      'weekly.exist': false,
    });

    const weeklyPlaylistExist = await Database.findOne({
      userKey: userID,
      'weekly.exist': true,
    });

    const val = await FetchAllUserPlaylist(access_token);
    const PlaylistExistID = await val
      .filter((items) => items.id === weeklyPlaylistExist?.weekly.playlistID)
      .map((item) => item.id)[0];

    if (PlaylistExist || !PlaylistExistID) {
      const newWeeklyPlaylist = await Createplaylist(Name, Description, userID, access_token);
      console.log(`new playlist created for user ${userID}`);

      const PlaylistSongs = await FetchSongs(weeklyPlaylistId, 50, 0, access_token);

      await Database.findOneAndUpdate(
        {
          userKey: userID,
          'weekly.exist': true,
        },
        {
          $set: {
            'weekly.playlistID': newWeeklyPlaylist,
          },
        }
      );

      await Database.findOneAndUpdate(
        {
          userKey: userID,
          'weekly.exist': false,
        },
        {
          $set: {
            'weekly.exist': true,
            'weekly.weeklyID': weeklyPlaylistId,
            'weekly.playlistID': newWeeklyPlaylist,
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

module.exports = {
  WeeklyplaylistEndpoint,
};
