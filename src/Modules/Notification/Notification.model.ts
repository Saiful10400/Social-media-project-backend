import mongoose, { Schema } from "mongoose";

const reactionSchema: Schema = new Schema({
  for:{type:mongoose.Types.ObjectId,ref:"User"},
  by:{type:mongoose.Types.ObjectId,ref:"User"},
  type: { type: String,enum:["like","comment","follow"], required: true }, // e.g., 'like', 'comment', 'follow'
  content: { type: String },
  isRead: { type: Boolean, default: false },
  link: { type: String,require:false },
  
},{timestamps:true});

// Step 3: Create the Mongoose model
const notificationModel = mongoose.model("Notification", reactionSchema);

export default notificationModel;


