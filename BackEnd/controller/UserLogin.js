require(`dotenv`).config();

const axios = require(`axios`);
const Database = require(`../model/User`);

const {
  Createplaylist,
  FetchAllUserPlaylist,
  FetchSongs,
  AddSongsIntoPlaylist,
} = require('../lib/SpotiFunc');

const UserIdEndpoint = async (req, res) => {
  let access_token = req.cookies.Userdata;
  const userId = req.body.id;

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

module.exports = {
  UserIdEndpoint,
};
