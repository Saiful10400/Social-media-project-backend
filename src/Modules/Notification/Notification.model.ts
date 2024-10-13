import mongoose, { Schema } from "mongoose";

const reactionSchema: Schema = new Schema({
  message: { type: String,  required: true }, // Post ID as a string
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
  
});

// Step 3: Create the Mongoose model
const notificationModel = mongoose.model("Notification", reactionSchema);

export default notificationModel;


