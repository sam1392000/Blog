const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    blogid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    like: {
      type: Boolean,
      required: true,
      default: false,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timeStaps: true }
);
const comment = mongoose.model("comment", commentSchema);
module.exports = comment;
