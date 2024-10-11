import mongoose from "mongoose";
import { Treaction } from "./reaction.interface";
import reactonModel from "./reaction.model";
import postModel from "../post/post.model";

const manageReaction = async (payload: Treaction) => {
  // checking is the user exist on db.
  const isExist = await reactonModel.findOne({
    reactor: new mongoose.Types.ObjectId(payload.reactor),post:new mongoose.Types.ObjectId(payload.post)
  });

  if (isExist) {
    if (isExist.reactionType === payload.reactionType) {
      // delete the data. and with following conditions.
      if (isExist.reactionType === "down") {
        //delete and increment1
        const deletion = await reactonModel.deleteOne({
          post: new mongoose.Types.ObjectId(payload.post),
          reactor: new mongoose.Types.ObjectId(payload.reactor),
        });
        const voteUpdate = await postModel.findByIdAndUpdate(payload.post, {
          $inc: { vote: 1 },
        });
        return { deletion, voteUpdate };
      } else if (isExist.reactionType === "up") {
        // delete and decrement 1
        const deletion = await reactonModel.deleteOne({
          post: new mongoose.Types.ObjectId(payload.post),
          reactor: new mongoose.Types.ObjectId(payload.reactor),
        });
        const voteUpdate = await postModel.findByIdAndUpdate(payload.post, {
          $inc: { vote: -1 },
        });
        return { deletion, voteUpdate };
      }
    } else {
      
      if (payload.reactionType === "up") {
        // meke it up and increment2
        const update = await reactonModel.updateOne(
          {
            post: new mongoose.Types.ObjectId(payload.post),
            reactor: new mongoose.Types.ObjectId(payload.reactor),
          },
          { reactionType: "up" },
          { new: true }
        );
        const voteUpdate = await postModel.findByIdAndUpdate(payload.post, {
          $inc: { vote: 2 },
        });
        
        return { update, voteUpdate };
      } else if (payload.reactionType === "down") {
        // make it down and decrement2
        const update = await reactonModel.updateOne(
          {
            post: new mongoose.Types.ObjectId(payload.post),
            reactor: new mongoose.Types.ObjectId(payload.reactor),
          },
          { reactionType: "down" },
          { new: true }
        );
        const voteUpdate = await postModel.findByIdAndUpdate(payload.post, {
          $inc: { vote: -2 },
        });
        return { update, voteUpdate };
      }
    }
  } else {
    // create one as like new.
    const result = await reactonModel.create(payload);
    const voteUpdate = await postModel.findByIdAndUpdate(payload.post, {
      $inc: { vote: payload.reactionType === "up" ? 1 : -1 },
    });
    return { result, voteUpdate };
  }
};

const reactionService = { manageReaction };
export default reactionService;
