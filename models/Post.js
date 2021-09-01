import mongoose from "mongoose";
import Comment from "./Comment";

export const PostSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  userid: {
    type: String,
  },
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
  comments: [
    {
      text: String,
      author_username: String,
      author_id: String,
      author_prof_pic: String,
      date: Date,
    },
  ],
  likes: [String],
  location: {
    type: String,
  },
});

mongoose.models = { Comment };

const Post = mongoose.model("Post", PostSchema);

export default Post;
