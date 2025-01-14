import mongoose from "mongoose";
import { pageModel, userPageModel } from "./page.model";

// create a page.
const createPage = async (payload: { [key: string]: string }) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const page = await pageModel.create(payload);
    const createUserPage = await userPageModel.create({
      user: page.admin,
      page: page._id,
      role: "admin",
      accept: true,
    });
    return { page, createUserPage };
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};

const userAllPage = async (id: string) => {
  const result = await userPageModel
    .find({
      user: new mongoose.Types.ObjectId(id),
      accept: true,
    })
    .populate("page");
  return result;
};

const userAllInvitationPage = async (id: string) => {
  const result = await userPageModel
    .find({
      user: new mongoose.Types.ObjectId(id),
      accept: false,
    })
    .populate("page");
  return result;
};

const createAPageUserInstance = async (payload: { [key: string]: string }) => {
  const result = await userPageModel.create(payload);
  return result;
};

const modifyInvitation = async (id: string, isAccept: boolean) => {
  let result;
  if (isAccept) {
    result = await userPageModel.findByIdAndUpdate(id, { accept: true });
  } else {
    result = await userPageModel.findByIdAndDelete(id);
  }
  return result;
};

const aPageDetails = async (id: string) => {
  const result = await pageModel.findById(id).populate("admin");
  const memberCount = await userPageModel.countDocuments({
    page: new mongoose.Types.ObjectId(id),
    accept: true,
  });
  return { result, memberCount };
};

const aPageFollowers = async (id: string) => {
  const pendingUser = await userPageModel.find({
    page: new mongoose.Types.ObjectId(id),
    accept: false,
  });
  const activeUser = await userPageModel.find({
    page: new mongoose.Types.ObjectId(id),
    accept: true,
  });
  return { pendingUser, activeUser };
};

const pageService = {
  aPageFollowers,
  createPage,
  userAllPage,
  userAllInvitationPage,
  createAPageUserInstance,
  modifyInvitation,
  aPageDetails,
};
export default pageService;
