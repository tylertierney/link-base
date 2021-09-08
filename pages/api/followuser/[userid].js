import clientPromise from "../../../utils/mongodb";
import mongoose from "mongoose";
import Post from "../../../models/Post";
import User from "../../../models/User";

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    const foundcurrentuser = await User.findOne({
      id: req.body.currentuser_id,
    });

    const foundtargetuser = await User.findOne({
      id: req.query.userid,
    });

    if (req.body.action === "add") {
      foundcurrentuser.following.push(req.query.userid);
      foundtargetuser.followers.push(req.body.currentuser_id);
      foundcurrentuser.save();
      foundtargetuser.save();
      res.status(200).json({
        message: "A follower was added",
        body: foundcurrentuser,
      });
    } else {
      const index_of_current = foundcurrentuser.following.indexOf(
        req.query.userid
      );
      const index_of_target = foundtargetuser.followers.indexOf(
        req.body.currentuser_id
      );

      foundcurrentuser.following.splice(index_of_target, 1);
      foundtargetuser.followers.splice(index_of_current, 1);

      foundcurrentuser.save();
      foundtargetuser.save();

      res.status(200).json({
        message: "A follower was removed",
        body: foundcurrentuser,
      });
    }
  }
};

export default handler;
