import { Server } from "socket.io";
import { createServer } from "http";
import app from "../../app";
import mongoose from "mongoose";
import notificationModel from "../Notification/Notification.model";
import { TfriendRequest } from "../../types";
import friendModel from "../Friend/friend.model";

export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://socialmedia10400.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});
type Tuser = { _id: string; sId: string; email: string };

let activeUser: Tuser[] = [];

// get active frinds.
const getActiveFriends = async (id: string) => {
  const frindsResponse = await friendModel
    .find({
      $or: [
        { sender: new mongoose.Types.ObjectId(id) },
        { receiver: new mongoose.Types.ObjectId(id) },
      ],
      status: true,
    })
    .populate("sender")
    .populate("receiver");
  const frinds = frindsResponse.map((item) => {
    if (item.sender._id.toString() !== id) {
      return item.sender;
    } else if (item.receiver._id.toString() !== id) {
      return item.receiver;
    }
  });
  const activeFriends = frinds?.filter((item) => {
    return activeUser.some((element) => element._id === item?._id.toString());
  });

  return activeFriends;
};

// on disconnect user handle on front-end

const onDisconnectAndConnectActiveuserHandle = async (id: string) => {
  if (!id) return;

  const frindsResponse = await friendModel
    .find({
      $or: [
        { sender: new mongoose.Types.ObjectId(id) },
        { receiver: new mongoose.Types.ObjectId(id) },
      ],
      status: true,
    })
    .populate("sender")
    .populate("receiver");
  const frinds = frindsResponse.map((item) => {
    if (item.sender._id.toString() !== id) {
      return item.sender;
    } else if (item.receiver._id.toString() !== id) {
      return item.receiver;
    }
  });
  const activeFriends = frinds?.filter((item) => {
    return activeUser.some((element) => element._id === item?._id.toString());
  });

  const activeFriendsId = activeFriends.map((item) => item?._id.toString());

  activeFriendsId?.forEach(async (userId) => {
    const socketId = activeUser.find((item) => item._id === userId)?.sId;
    const userActiveFriends = await getActiveFriends(userId as string);
    io.to(socketId as string).emit("activeFrindList", userActiveFriends);
  });
};

// user activation handle
io.on("connection", (socket) => {
  socket.on("connection", (data) => {
    if (!activeUser.find((item) => item.sId === socket.id)) {
      activeUser.push({ ...data, sId: socket.id });
      const id = activeUser.find((item) => item.sId === socket.id)?._id;
      onDisconnectAndConnectActiveuserHandle(id as string);
    }
  });
  socket.on("disconnect", () => {
    const id = activeUser.find((item) => item.sId === socket.id)?._id;
    activeUser = activeUser.filter((item) => item.sId !== socket.id);
    onDisconnectAndConnectActiveuserHandle(id as string);
  });
});

type TNotification = {
  type: "like" | "comment" | "follow"; // Enum values
  content?: string;
  link?: string;
  for: string;
  by?: string;
};

export const sendNotiFicationWithSocketIo = async (payload: TNotification) => {
  // console.log(payload,activeUser)

  const session = await mongoose.startSession();

  try {
    const id = activeUser.find(
      (item) => item._id === payload.for?.toString()
    )?.sId;
    session.startTransaction();
    await notificationModel.create(payload);
    const userAllNotification = await notificationModel
      .find({ for: new mongoose.Types.ObjectId(payload.for) })
      .sort({ _id: -1 })
      .populate("for")
      .populate("by");

    io.to(id as string).emit("notification", userAllNotification);
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};

// send frind request.
export const sendFrindRequest = (userId: string, data: TfriendRequest[]) => {
  const id = activeUser.find((item) => item._id === userId)?.sId;
  io.to(id as string).emit("frindRequest", data);
};

//send active frinds list.
io.on("connection", (socket) => {
  socket.on("activeFriend", async (id: string) => {
    const activeFriend = await getActiveFriends(id);
    const listenerId = activeUser.find((item) => item._id === id)?.sId;
    io.to(listenerId as string).emit("activeFrindList", activeFriend);
  });
});
