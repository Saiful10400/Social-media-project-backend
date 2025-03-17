import mongoose, { InferSchemaType } from "mongoose";
import friendModel from "./friend.model";
import { friendSchema } from "./friend.model";
import { sendFrindRequest } from "../Socketio";
import { TfriendRequest } from "../../types";
import { signupModel } from "../Authentication/authentication.model";

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
      $and: [
        {
          $or: [
            { sender: new mongoose.Types.ObjectId(id) },
            { receiver: new mongoose.Types.ObjectId(id) },
          ],
        },
       
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

// people you may know.

const peopleYouMayKnow = async (id: string) => {
  const friendList = await friendModel
    .find({
      $or: [
        { sender: new mongoose.Types.ObjectId(id) },
        { receiver: new mongoose.Types.ObjectId(id) },
      ],
      status: true,
    })
    .lean();
  const existingFriendArr = friendList?.map((item) => {
    if (item.sender.toString() === id) return item.receiver;
    if (item.receiver.toString() === id) return item.sender;
  });
  existingFriendArr.push(new mongoose.Types.ObjectId(id));

  const result = await signupModel
    .find({ _id: { $nin: existingFriendArr } })
    .skip(0)
    .limit(7);
  return result;
};

const getExistingFriends = async (id: string) => {
  const friendList = await friendModel
    .find({
      $or: [
        { sender: new mongoose.Types.ObjectId(id) },
        { receiver: new mongoose.Types.ObjectId(id) },
      ],
      status: true,
    })
    .lean();
  const result = friendList?.map((item) => {
    if (item.sender.toString() === id) return item.receiver;
    if (item.receiver.toString() === id) return item.sender;
  });
  return result;
};

export const friendService = {
  createFriendRequest,
  modifyRequest,
  allFrind,
  allFriendRequest,
  peopleYouMayKnow,
  getExistingFriends
};
