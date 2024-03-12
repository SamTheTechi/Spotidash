const axios = require('axios');

const Createplaylist = async (Name, Description, UserID, access_token) => {
  try {
    await axios.post(
      `https://api.spotify.com/v1/users/${UserID}/playlists`,
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
    const val = await FetchAllUserPlaylist(access_token);
    return (data = val
      .filter((items) => items.name === Name || items.description === Description)
      .map((item) => item.id)[0]);
  } catch (e) {
    console.log(`error while creating New playlist`, e);
  }
};

const FetchAllUserPlaylist = async (access_token) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    let data = response.data.items;
    return data;
  } catch (e) {
    console.log(`error while fetching UsersPlaylist`, e.message);
  }
};

const FetchSongs = async (PlaylistId, limit, offset, access_token) => {
  let allSongs = [];
  try {
    do {
      var response = await axios.get(
        `https://api.spotify.com/v1/playlists/${PlaylistId}/tracks?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data = response.data.items;
      const songs = data.map((items) => items.track.uri);
      allSongs = allSongs.concat(songs);
      offset += 50;
    } while (offset < response.data.total);
  } catch (e) {
    throw e;
  }
  return allSongs;
};

const AddSongsIntoPlaylist = async (songs, PlaylistId, access_token) => {
  try {
    for (const item of songs) {
      if (!item) {
        continue;
      }

      try {
        let response = await axios.post(
          `https://api.spotify.com/v1/playlists/${PlaylistId}/tracks`,
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

        let track = item.split(':')[2];
        await new Promise((resolve) => setTimeout(resolve, 50));
      } catch (e) {
        console.error(`Error adding track: ${e.message}`);
      }
    }
  } catch (e) {
    console.error(`Error in AddSongs function: ${e.message}`);
  }
};

module.exports = {
  Createplaylist,
  FetchAllUserPlaylist,
  FetchSongs,
  AddSongsIntoPlaylist,
};
