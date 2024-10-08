import httpStatus from "http-status";
import config from "../../config";
import appError from "../../Errors/appError";
import { Tuser, TuserLogin } from "./authentication.interface";
import { signupModel } from "./authentication.model";
import jwt from "jsonwebtoken";
// 1. signup.
const signup = async (payload: Tuser) => {


  // let's check is the same user is exixt or not.
  const isUserExist = await signupModel.findOne({ email: payload.email });
  if (isUserExist)
    throw new appError(httpStatus.CONFLICT, "This email address already used!");
  const data = await signupModel.create(payload);

  // create jwt token.
  // const jwtPayload = {
  //   id: data._id,
  //   role: data.role,
  // };
  // const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, {
  //   expiresIn: config.accessTokenLife,
  // });

  return data
};









//2. login.
const login = async (payload: TuserLogin) => {
  const data = await signupModel.findOne(payload);
 
  if (!data)
    throw new appError(httpStatus.UNAUTHORIZED, "Incorrect email or password!");
data.password=undefined

// create jwt token.
const jwtPayload = {
  id: data._id,
  role: data.role,
};
const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, {
  expiresIn: config.accessTokenLife,
});


  return {data,accessToken};
};


//2. getucrrentuser.
const getCurrentUser = async (payload:string) => {
  const result=await signupModel.findById(payload)
  return result

};


// 4. check credentials.
const checkCredential=async(name,email)=>{
  const isExist=await signupModel.findOne({name,email})

  if(isExist){
    return {credential:true}
  }
  else{
    return {credential:false}
  }
}

//5. change password.
const changePassword=async(payload)=>{
  
  const crUpdate=await signupModel.updateOne({email:payload.email},{password:payload.password})
  return crUpdate
}

const AuthenticationService = {
  signup,
  login,
  getCurrentUser,
  checkCredential,
  changePassword
};

export default AuthenticationService;
