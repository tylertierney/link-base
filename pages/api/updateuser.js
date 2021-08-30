import clientPromise from "../../utils/mongodb";
import mongoose from "mongoose";
import User from "../../models/User";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "PUT") {
    // const newpost_obj = new Post({
    //   userid: req.body.userid,
    //   text: req.body.text,
    //   photoURL: req.body.photo_url,
    //   author: req.body.author,
    //   posted_at: Date.now(),
    //   comments: [],
    //   likes: [],
    //   location: req.body.location,
    // });

    const founduser = await User.findOneAndUpdate(
      {
        id: req.body.userid,
      },
      {
        prof_pic_url: req.body.profURL,
      }
    );

    res
      .status(200)
      .json({ message: "Mongo DB has updated this user's profile" });
  }
};

export default handler;
