import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: [300, "Comments are limited to 300 characters"],
  },
});

mongoose.models = {};

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
