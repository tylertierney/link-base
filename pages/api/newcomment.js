import clientPromise from "../../utils/mongodb";
import mongoose from "mongoose";
import Post from "../../models/Post";
import User from "../../models/User";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    const newcomment_obj = {
      author_id: req.body.userid,
      text: req.body.text,
      author_username: req.body.author_username,
      author_prof_pic: req.body.author_prof_pic,
      date: Date.now(),
    };

    // const founduser = await User.findOneAndUpdate(
    //   {
    //     id: req.body.userid,
    //   },
    //   {
    //     $push: {
    //       posts: newpost_obj,
    //     },
    //   }
    // );
    const founduser = await User.findOne({
      id: req.body.author_id,
    });

    console.log(founduser);
    res
      .status(200)
      .json({ message: "Mongo DB has added this post to the user's profile" });
  }
};

export default handler;
