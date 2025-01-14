import mongoose from "mongoose";
import notificationModel from "./Notification.model";
import UserPaymentModel from "../UserPayment/UserPayment.model";
import postModel from "../post/post.model";
import { signupModel } from "../Authentication/authentication.model";

//1.
const createNoti = async (payload: {
  [key: string]: string | number | boolean;
}) => {
  const result = await notificationModel.create(payload);
  return result;
};

//2.
const getNoti = async (id: string) => {
  const result = await notificationModel.find({
    for: new mongoose.Types.ObjectId(id),
  });
  return result;
};

//3.
const makeAllRead = async (id: string) => {
  const result = await notificationModel.updateMany(
    { for: new mongoose.Types.ObjectId(id) },
    { $set: { isRead: true } }
  );
  return result;
};

//4. get all notification.
const getAllNotification = async () => {
  const result = await notificationModel.find().populate("for");
  return result;
};

//5. delete a notification.
const deleteANotification = async (id: string) => {
  const result = await notificationModel.findByIdAndDelete(id);
  return result;
};

//6. dahsboard credentislas.
const dashboardCredentials = async () => {
  //card data.
  const totalPayment = (await UserPaymentModel.find().select("amount"))
    ?.map((item) => Number(item.amount))
    ?.reduce((a, b) => a + b, 0);
  const totalPost = await postModel.countDocuments();
  const totalUser = await signupModel.countDocuments();
  const cardData = { totalPayment, totalPost, totalUser };

  //piechart data.
  const verifyedUser = await signupModel.countDocuments({ verifyed: false });
  const unVerifyedUser = await signupModel.countDocuments({ verifyed: true });
  const pieChartData = { verifyedUser, unVerifyedUser };

  //barchart data.
  const deletedPost = await postModel.countDocuments({ isDeleted: true });
  const paidPost = await postModel.countDocuments({ costing: "Paid" });
  const freePost = await postModel.countDocuments({ costing: "Free" });
  const blockPost = await postModel.countDocuments({ isBlock: true });
  const barChartData = { deletedPost, paidPost, freePost, blockPost };

  return { cardData, pieChartData, barChartData };
};

const notiser = {
  createNoti,
  getNoti,
  makeAllRead,
  getAllNotification,
  deleteANotification,
  dashboardCredentials,
};

export default notiser;

// 1. total payment
// 2. total post
// 3. total user

// // active and block user ratio.
// 1. active user-
// 2. blocked user-

// // post status.
// 1. deleted-
// 2. paid-
// 3. free-
// 4. block-
