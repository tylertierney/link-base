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
      friends: [],
      liked_posts: [],
      posts: [],
      prof_pic_url: "",
      id: req.body.id,
      user_obj: req.body,
    });

    newuser_obj.save((err, result) => {
      if (err) console.log(err);
      console.log(result);
    });

    console.log(req.body.user_metadata.username);
    // db.collection("users").insertOne(req.body);

    res.status(200).json({
      message: "Mongo DB has added this users to the 'users' collection",
    });
  }
};

export default handler;
