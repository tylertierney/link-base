import clientPromise from "../../utils/mongodb";
import User from "../../models/User";
import mongoose from "mongoose";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  if (req.method === "POST") {
    const {
      api,
      app_metadata,
      aud,
      audience,
      confirmed_at,
      created_at,
      email,
      id,
      role,
      token,
      updated_at,
      url,
      user_metadata,
      admin,
      _details,
    } = req.body;

    const newuser_obj = new User({
      username: user_metadata.username,
      friends: [],
      liked_posts: [],
      posts: [],
      prof_pic_url: "",
      user_obj: req.body,
    });

    newuser_obj.save((err, result) => {
      if (err) console.log(err);
      console.log(result);
    });

    // db.collection("users").insertOne(req.body);

    res.status(200).json({
      message: "Mongo DB has added this users to the 'users' collection",
    });
  }
};

export default handler;
