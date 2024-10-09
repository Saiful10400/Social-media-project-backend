import mongoose from "mongoose";
import { Tfollow } from "./following.interface";

const followSchema = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  }, { timestamps: true });



  const followingModel= mongoose.model<Tfollow>('Follow', followSchema);

  export default followingModel