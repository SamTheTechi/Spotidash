require(`dotenv`).config();
const { FetchSongs, AddSongsIntoPlaylist } = require('../lib/SpotiFunc');
const Database = require(`../model/UserInfo`);

const UserIdEndpoint = async (req, res) => {
  try {
    const { userID, userName, access_token } = req.body;
    try {
      let User = await Database.findOne({ userKey: userID });
      if (!User) {
        await Database.create({ userKey: userID, userName: userName });
        console.log(`user created`);
      }
      if (User && User.weekly.exist === true) {
        const PlaylistSongs = await FetchSongs(User.weekly.playlistID, 50, 0, access_token);

        const weeklySongs = await FetchSongs(User.weekly.weeklyID, 50, 0, access_token);

        const songsToBeAdded = weeklySongs
          .map((item) => {
            const Exist = !PlaylistSongs.some((track) => track === item);
            if (Exist) return item;
            else return null;
          })
          .filter(Boolean);

        AddSongsIntoPlaylist(songsToBeAdded, User.weekly.playlistID, access_token);
        console.log(`weekly songs updated`);
      }
      //   if (User && User.Blend !== null) {
      //     // const val = await FetchAllUserPlaylist(access_token);
      //     // const blendPlaylistIDs = User.Blend.map((item) => item.PlaylistID);
      //     // const yoi = val.map((item) => item.id).filter((item) => blendPlaylistIDs.includes(item));

      //     // for(let item of yoi){
      //     //   await Database.findOneAndUpdate(
      //     //     {
      //     //       UserKey: userID,
      //     //     },
      //     //     $pop:{

      //     //     },
      //     //   )
      //     // }

      //     for (let items of User.Blend) {
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
    } catch (e) {}
  } catch (e) {
    console.log(`error fetching user info`);
  }
  res.json({ response: `sucess` });
};

module.exports = {
  UserIdEndpoint,
};
