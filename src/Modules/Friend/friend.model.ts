import mongoose from "mongoose";

export const friendSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: Boolean,
      default:false
    },
  },
  { timestamps: true }
);

const friendModel = mongoose.model("Friend", friendSchema);

export default friendModel;
