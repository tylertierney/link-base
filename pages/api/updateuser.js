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

    if (req.body.prof_pic_url) {
      updateuser_obj["prof_pic_url"] = req.body.prof_pic_url;
    }
    if (req.body.cover_photo_url) {
      updateuser_obj["cover_pic_url"] = req.body.cover_photo_url;
    }

    if (req.body.bio) {
      updateuser_obj["bio"] = req.body.bio;
    }

    console.log(req.body.prof_pic_url);

    const founduser = await User.findOneAndUpdate(
      {
        id: req.body.userid,
      },
      {
        bio: req.body.bio,
        prof_pic_file: Buffer.from(req.body.prof_pic_file),
        cover_photo_file: Buffer.from(req.body.cover_photo_file),
      }
    );

    res
      .status(200)
      .json({ message: "Mongo DB has updated this user's profile" });
  }
};

export default handler;
