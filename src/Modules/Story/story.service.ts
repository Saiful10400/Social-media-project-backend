import { musicModel, storyModel } from "./story.model"

const addMusic=async(payload:{name:string,url:string})=>{

    const result=await musicModel.create(payload)
    return result

}

const getAMusic=async(id:string)=>{
    const result=await musicModel.findById(id)
    return result
}

const getAllMusic=async()=>{
    const result=await musicModel.find()
    return result
}

const getStory=async(id:string)=>{



}


// story services.

const createStory=async(payload:{[key:string]:string})=>{
    const result=await storyModel.create(payload)
    return result
}


const storyService={addMusic,getAMusic,getAllMusic,createStory,getStory}
export default storyService