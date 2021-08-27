import mongoose from "mongoose";
import Comment from "./Comment";

export const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: [1000, "Posts cannot be more than 1000 characters."],
  },
  photoURL: {
    type: String,
  },
  posted_at: {
    type: Date,
    default: Date.now,
  },
  comments: [{ body: String, date: Date }],
});

mongoose.models = { Comment };

const Post = mongoose.model("Post", PostSchema);

export default Post;
