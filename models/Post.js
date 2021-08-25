import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please write a post to continue"],
    maxlength: [1000, "Posts cannot be more than 1000 characters."],
  },
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
