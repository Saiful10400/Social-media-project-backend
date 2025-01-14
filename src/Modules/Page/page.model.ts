import mongoose, { Schema } from "mongoose";

const reactionSchema: Schema = new Schema(
  {
    admin: { type: mongoose.Types.ObjectId, ref: "User", require:true },
    logo: { type: String },
    coverImg: { type: String },
    isRead: { type: Boolean, default: false },
    name: { type: String, require: true },
  },
  { timestamps: true }
);

// Step 3: Create the Mongoose model
export const pageModel = mongoose.model("page", reactionSchema);

const userPageSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    page: { type: mongoose.Types.ObjectId, ref: "page" },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    accept: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Step 3: Create the Mongoose model
export const userPageModel = mongoose.model("userPage", userPageSchema);
