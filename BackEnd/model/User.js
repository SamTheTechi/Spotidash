const mongoose = require("mongoose");

const UserInfo = new mongoose.Schema({
  UserKey: {
    type: Number,
    require: true,
    unique: true,
  },

  Weekly: {
    Exist: {
      type: Boolean,
      default: false,
      require: true,
    },
    WeeklyID: {
      type: String,
      default: null,
    },
    PlaylistID: {
      type: String,
      default: null,
    },
  },

  Blend: [
    {
      selectedBlends: [
        {
          type: String,
          unique: true,
        },
      ],
      selectedFilter: [
        {
          type: String,
          unique: true,
        },
      ],
      PlaylistID: {
        type: String,
        unique: true,
      },
    },
  ],
});

module.exports = mongoose.model(`UserInfo`, UserInfo);
