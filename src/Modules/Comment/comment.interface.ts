import { Types } from "mongoose";

export interface Tcomment{
commentor:Types.ObjectId,
comment:string,
post:Types.ObjectId
isDeleted?: boolean;
}