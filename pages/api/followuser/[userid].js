import clientPromise from "../../../utils/mongodb";
import mongoose from "mongoose";
import Post from "../../../models/Post";
import User from "../../../models/User";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    const founduser = await User.findOne({
      id: req.body.following_id,
    });
    //   const foundpost = founduser.posts.id(req.query.postid);

    console.log(founduser);

    res.status(200).json({
      message: "You just got a user from the database",
      body: founduser,
    });
  }
};

export default handler;
