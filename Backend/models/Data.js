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
      type: Array,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requred: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Memory", Memory);
