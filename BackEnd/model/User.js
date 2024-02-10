const mongoose = require("mongoose");

const UserInfo = new mongoose.Schema({
  UserKey: {
    type: String,
    unique: true,
    required: true,
  },

  Weekly: {
    Exist: {
      type: Boolean,
      default: false,
    },
    WeeklyID: {
      type: String,
      default: null,
    },
    PlaylistID: {
      type: String,
      default: null,
    },
    WhenCreate: {
      type: Date,
      default: Date.now(),
    },
  },

  Blend: [
    {
      selectedBlends: [
        {
          type: String,
          default: null,
        },
      ],
      selectedFilter: [
        {
          type: String,
          default: null,
        },
      ],
      PlaylistID: {
        type: String,
        default: null,
      },
      WhenCreate: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  Date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(`UserInfo`, UserInfo);
