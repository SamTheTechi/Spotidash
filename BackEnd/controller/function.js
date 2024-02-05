const axios = require("axios");

const Createplaylist = async (
  Name,
  Description,
  UserID,
  access_token,
  Fetchplaylist
) => {
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
    Fetchplaylist();
  } catch (e) {
    throw e;
  }
};

module.exports = { Createplaylist };
