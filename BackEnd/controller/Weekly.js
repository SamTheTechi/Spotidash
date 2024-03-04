require(`dotenv`).config();
const Database = require(`../model/User`);

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
      UserKey: userID,
      'Weekly.Exist': false,
    });

    const weeklyPlaylistExist = await Database.findOne({
      UserKey: userID,
      'Weekly.Exist': true,
    });

    const val = await FetchAllUserPlaylist(access_token);
    const PlaylistExistID = await val
      .filter((items) => items.id === weeklyPlaylistExist?.Weekly.PlaylistID)
      .map((item) => item.id)[0];

    if (PlaylistExist || !PlaylistExistID) {
      const newWeeklyPlaylist = await Createplaylist(Name, Description, userID, access_token);
      console.log(`new playlist created for user ${userID}`);

      const PlaylistSongs = await FetchSongs(weeklyPlaylistId, 50, 0, access_token);

      await Database.findOneAndUpdate(
        {
          UserKey: userID,
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
          UserKey: userID,
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

module.exports = {
  WeeklyplaylistEndpoint,
};
