import clientPromise from "../../utils/mongodb";
import mongoose from "mongoose";
import User from "../../models/User";

import aws from "aws-sdk";

const region = "us-east-2";
const bucketName = "linkbase";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  region,
  bucketName,
  accessKeyId,
  secretAccessKey,
});

const generateUploadURL = async () => {
  const randomNumber = Math.floor(Math.random() * 10000);

  console.log("random number: ", randomNumber);

  const imageName = randomNumber.toString();

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);

  return uploadURL;
};

const handler = async (req, res) => {
  const client = await clientPromise;

  const db = await client.db();

  mongoose.connect(process.env.MONGODB_URI);

  if (req.method === "GET") {
    const url = await generateUploadURL();
    console.log(url);
    res.send({ url });
  }
};

export default handler;
