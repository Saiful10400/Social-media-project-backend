import { Types } from "mongoose";

export interface Tfavourite {
    postId:Types.ObjectId,
    userId:Types.ObjectId
}