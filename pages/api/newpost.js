import clientPromise from "../../utils/mongodb";
import mongoose from "mongoose";
import Post from "../../models/Post";
import User from "../../models/User";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    const newpost_obj = new Post({
      userid: req.body.userid,
      text: req.body.text,
      photoURL: req.body.photo_url,
      author: req.body.author,
      posted_at: Date.now(),
      comments: [],
    });

    const founduser = await User.findOneAndUpdate(
      {
        id: req.body.userid,
      },
      {
        $push: {
          posts: newpost_obj,
        },
      }
    );

    console.log(founduser);

    res
      .status(200)
      .json({ message: "Mongo DB has added this post to the user's profile" });
  }
};

export default handler;
