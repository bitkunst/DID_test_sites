const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    userCode: {
      type: String,
    },
    userId: {
      type: String,
      required: [true, "User should have userId"],
    },
    userPw: {
      type: String,
      required: [true, "User should have userPw"],
    },
    point: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = UserSchema;
