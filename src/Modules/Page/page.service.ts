import mongoose, { InferSchemaType } from "mongoose";
import { pageModel, userPageModel } from "./page.model";
import postModel from "../post/post.model";
import reactonModel from "../Reaction/reaction.model";
import CommentModel from "../Comment/comment.model";
import favouriteModel from "../Favourite/favourite.model";

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

// update page.
const updatePage=async(id:string,payload:Partial<InferSchemaType<typeof pageModel>>)=>{
  const result=await pageModel.findByIdAndUpdate(id,payload)
  return result
}

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

const aPageAllPosts=async(id:string)=>{
  const allPost=await postModel.find({$and:[{group:new mongoose.Types.ObjectId(id)},{isGroupPost:true}]}).populate("creator")

  const result=allPost.map(async(item)=>{
    const allPromises=await reactonModel.find({post:new mongoose.Types.ObjectId(item?._id)})
    const comments=await CommentModel.find({post:new mongoose.Types.ObjectId(item?._id),isDeleted:false}).populate("commentor")
    const favourite=await favouriteModel.find({postId:new mongoose.Types.ObjectId(item?._id)})
    return{post:item,reaction:allPromises,comments,favourite}
})
 
return Promise.all(result)
}

const pageService = {
  aPageFollowers,
  createPage,
  userAllPage,
  userAllInvitationPage,
  createAPageUserInstance,
  modifyInvitation,
  aPageDetails,
  updatePage,
  aPageAllPosts
};
export default pageService;
