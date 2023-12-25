import mongoose from "mongoose";
const { Schema, model } = mongoose;
const Memory = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    activity: {
<<<<<<< HEAD
      type: Array,
=======
      type: String,
>>>>>>> 710c6c4426870ba8087e26f1e58be4f9b66177fc
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requred: true,
=======
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
>>>>>>> 710c6c4426870ba8087e26f1e58be4f9b66177fc
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Memory", Memory);
