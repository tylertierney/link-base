import clientPromise from "../../utils/mongodb";
import User from "../../models/User";
import mongoose from "mongoose";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    const newuser_obj = new User({
      username: req.body.user_metadata.username,
      following: [],
      followers: [],
      liked_posts: [],
      posts: [],
      prof_pic_url: "",
      cover_pic_url: "",
      id: req.body.id,
      user_obj: req.body,
      bio: "",
      email: req.body.email,
    });

    newuser_obj.save((err, result) => {
      if (err) console.log(err);
    });

    res.status(200).json({
      message: "Mongo DB has added this user to the 'users' collection",
    });
  }
};

export default handler;
