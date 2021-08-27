import mongoose from "mongoose";
import Post, { PostSchema } from "./Post";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    maxlength: [40, "Username can be 40 characters at the most."],
  },
  friends: {
    type: Array,
  },
  posts: [PostSchema],
  liked_posts: [PostSchema],
  prof_pic_url: {
    type: String,
  },
});

mongoose.models = { Post };

const User = mongoose.model("User", UserSchema, "users");

export default User;
