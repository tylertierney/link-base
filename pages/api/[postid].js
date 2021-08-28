import clientPromise from "../../utils/mongodb";
import mongoose from "mongoose";
import Post from "../../models/Post";
import User from "../../models/User";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    const founduser = await User.findOne({
      id: req.body.post.userid,
    });
    const foundpost = founduser.posts.id(req.query.postid);
    if (req.body.addOrRemove === "add") {
      foundpost.likes.push(req.body.currentuser);
      founduser.save();
    } else {
      foundpost.likes.filter((userid) => userid !== req.body.currentuser);
      founduser.save();
    }

    console.log(foundpost.likes);

    res.status(200).json({
      message: "A like has been added to this post",
    });
  }
};

export default handler;
