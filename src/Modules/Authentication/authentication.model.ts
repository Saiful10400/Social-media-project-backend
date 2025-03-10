import { model, Schema } from "mongoose";
import { Tuser, UserModel } from "./authentication.interface";

const signupSchema = new Schema<Tuser>({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  img: {
    type: String,
    required: [true, "Profile image URL is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  coverImg: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  profession: {
    type: String,
    default: null
  },
  educationInstitute: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  verifyed: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  socialLinks: {
    type: [String],
    
    default: []
  }
}, { timestamps: true });

signupSchema.post("save", function (docs, next) {
  this.password = undefined!; 
  next();
});

signupSchema.statics.isUserExixtById=async function(id:string){
return await signupModel.findById(id)
}

export const signupModel = model<Tuser,UserModel>("User", signupSchema);
