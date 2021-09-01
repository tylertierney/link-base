import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: [300, "Comments are limited to 300 characters"],
  },
  author_username: {
    type: String,
  },
  author_id: {
    type: String,
  },
  author_prof_pic: {
    type: String,
  },
  posted_date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
