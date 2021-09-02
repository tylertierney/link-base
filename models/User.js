import mongoose from "mongoose";
import Post, { PostSchema } from "./Post";
import clientPromise from "../utils/mongodb";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    maxlength: [40, "Username can be 40 characters at the most."],
  },
  following: {
    type: [String],
  },
  followers: {
    type: [String],
  },
  posts: [PostSchema],
  liked_posts: [PostSchema],

  id: {
    type: String,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
  },
  prof_pic_file: {
    type: Buffer,
  },
  cover_photo_file: {
    type: Buffer,
  },
});

mongoose.models = { Post };

const User = mongoose.model("User", UserSchema, "users");

export default User;
