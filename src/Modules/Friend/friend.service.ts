import mongoose, { InferSchemaType } from "mongoose";
import friendModel from "./friend.model";
import { friendSchema } from "./friend.model";
import { sendFrindRequest } from "../Socketio";
import { TfriendRequest } from "../../types";

//create a friend request.
const createFriendRequest = async (
  payload: InferSchemaType<typeof friendSchema>
) => {
  const result = await friendModel.create(payload);
  const frindRequestsResult: unknown = await friendModel
    .find({
      receiver: new mongoose.Types.ObjectId(payload.receiver),
      status: false,
    })
    .populate("sender");
  const frindRequests = frindRequestsResult as TfriendRequest[];
  sendFrindRequest(result.receiver.toString(), frindRequests);

  return result;
};

// modify request.
const modifyRequest = async (payload: {
  status: "accept" | "reject";
  sender: string;
  receiver: string;
}) => {
  let result;

  if (payload.status === "accept") {
    result = await friendModel.updateOne(
      {
        $and: [
          { sender: new mongoose.Types.ObjectId(payload.sender) },
          { receiver: new mongoose.Types.ObjectId(payload.receiver) },
        ],
      },
      {
        $set: { status: true },
      }
    );
  } else if (payload.status === "reject") {
    result = await friendModel.deleteOne({
      $and: [
        { sender: new mongoose.Types.ObjectId(payload.sender) },
        { receiver: new mongoose.Types.ObjectId(payload.receiver) },
      ],
    });
  }
  return result;
};
// modify request.
const allFrind = async (id: string) => {
  const result = await friendModel
    .find({
      $or: [
        { sender: new mongoose.Types.ObjectId(id) },
        { receiver: new mongoose.Types.ObjectId(id) },
      ],
    })
    .populate("receiver")
    .populate("sender");
  return result;
};

// all friend request.
const allFriendRequest = async (id: string) => {
  const result = await friendModel
    .find({ receiver: new mongoose.Types.ObjectId(id), status: false })
    .populate("sender");
  return result;
};

export const friendService = {
  createFriendRequest,
  modifyRequest,
  allFrind,
  allFriendRequest,
};
