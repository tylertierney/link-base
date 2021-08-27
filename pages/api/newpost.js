import clientPromise from "../../utils/mongodb";
import mongoose from "mongoose";
import Post from "../../models/Post";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    const newpost_obj = new Post({
      text: req.body.text,
      photoURL: req.body.photo_url,
      author: req.body.author,
      posted_at: Date.now,
      comments: [],
    });

    newpost_obj.save((err, result) => {
      if (err) console.log(err);
      console.log(result);
      console.log("newpost_obj sent to database");
    });

    res
      .status(200)
      .json({ message: "Mongo DB has added this post to the user's profile" });
  }
};
