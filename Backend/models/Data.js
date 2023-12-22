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
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Memory", Memory);
