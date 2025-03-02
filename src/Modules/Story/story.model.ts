import mongoose, { Schema } from "mongoose";

const musicSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    musicArt: { type: String, require: true },
    url: { type: String, require: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const storySchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    musicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "music",
      required: false,
    },
    mediaType: { type: String, enum: ["photo", "video", "Text"] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Step 3: Create the Mongoose model
export const musicModel = mongoose.model("music", musicSchema);

// story model
export const storyModel=mongoose.model("story",storySchema)