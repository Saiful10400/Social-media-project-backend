import { Server } from "socket.io";
import { createServer } from "http";
import app from "../../app";
import mongoose from "mongoose";
import notificationModel from "../Notification/Notification.model";

export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","https://apollow-assignment-6-front-end.vercel.app"],
    methods: ["GET", "POST"],
  },
});
type Tuser = { _id: string; sId: string; email: string };

let activeUser: Tuser[] = [];

// user activation handle
io.on("connection", (socket) => {
  socket.on("connection", (data) => {
    if (!activeUser.find((item) => item.sId === socket.id)) {
      activeUser.push({ ...data, sId: socket.id });
    }
  });
  socket.on("disconnect", () => {
    activeUser = activeUser.filter((item) => item.sId !== socket.id);
  });
});

type TNotification = {
  type: "like" | "comment" | "follow"; // Enum values
  content?: string;
  link?: string;
  for:string;
  by?:string
};

export const sendNotiFicationWithSocketIo = async(
  payload: TNotification
) => {
  // console.log(payload,activeUser)
 
    const session = await mongoose.startSession();

    try {
      const id = activeUser.find((item) => item._id === payload.for?.toString())?.sId
      session.startTransaction();
      await notificationModel.create(payload);
      const userAllNotification=await notificationModel.find({for:new mongoose.Types.ObjectId(payload.for)}).sort({_id:-1}).populate("for").populate("by")
     
      io.to(id as string).emit("notification", userAllNotification);
    } catch (error) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  
};
