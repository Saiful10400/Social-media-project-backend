import mongoose, { InferSchemaType, Schema } from "mongoose";

const pageSchema: Schema = new Schema(
  {
    admin: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    logo: { type: String },
    coverImg: { type: String },
    isRead: { type: Boolean, default: false },
    name: { type: String, require: true },
    // edition 2.0.
    desciption: { type: String, require: false, default: "" },
    privacy: {
      type: String,
      enum: ["private", "publick", "close"],
      default: "publick",
    },
  },
  { timestamps: true }
);

// Step 3: Create the Mongoose model
export const pageModel = mongoose.model<InferSchemaType<typeof pageSchema>>("page", pageSchema);

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
