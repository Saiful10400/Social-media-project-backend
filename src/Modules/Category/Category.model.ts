import mongoose, { Schema } from "mongoose";

const reactionSchema: Schema = new Schema(
  {
    name: { type: String, unique: true },
    isDeleted: { type: Boolean, default:false },
  },
  { timestamps: true }
);

// Step 3: Create the Mongoose model
const categoryModel = mongoose.model("Category", reactionSchema);

export default categoryModel;
