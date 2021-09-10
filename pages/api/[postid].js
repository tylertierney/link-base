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

    if (req.body.likeOrComment === "like") {
      if (req.body.addOrRemove === "add") {
        foundpost.likes.push(req.body.currentuser);
      } else {
        const indexToRemove = foundpost.likes.indexOf(req.body.currentuser);
        foundpost.likes.splice(indexToRemove, 1);
      }
    } else if (req.body.likeOrComment === "comment") {
      const commentObject = {
        author_id: req.body.userid,
        text: req.body.text,
        author_username: req.body.author_username,
        author_prof_pic: req.body.author_prof_pic,
        date: Date.now(),
      };
      foundpost.comments.push(commentObject);
    }
    founduser.save();

    res.status(200).json({
      message: "A like or comment on this post has changed",
    });
  }
};

export default handler;
