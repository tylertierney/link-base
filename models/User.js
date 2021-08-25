import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter a first name"],
    maxlength: [40, "Your name can't be that long"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter a last name"],
    maxlength: [40, "Your last name can't be that long"],
  },
});
