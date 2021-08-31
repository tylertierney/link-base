import clientPromise from "../../utils/mongodb";
import mongoose from "mongoose";
import User from "../../models/User";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    console.log(req.body);

    const updateuser_obj = {};

    // const founduser = await User.findOneAndUpdate(
    //   {
    //     id: req.body.userid,
    //   },
    //   {
    //     prof_pic_url: req.body.prof_pic_url,
    //     cover_pic_url: req.body.cover_photo_url,
    //     bio: req.body.bio
    //   }
    // );

    res
      .status(200)
      .json({ message: "Mongo DB has updated this user's profile" });
  }
};

export default handler;
