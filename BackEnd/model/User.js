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
    WhenCreate: {
      type: Date,
      default: Date.now(),
    },
    WeeklyID: {
      type: String,
      default: "NO ID yet",
    },
    PlaylistID: {
      type: String,
      default: "NO ID yet",
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
    },
  ],
  Date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(`UserInfo`, UserInfo);
