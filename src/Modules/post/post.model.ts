import mongoose from 'mongoose';

// Define the Post schema
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, // Assuming creator is a reference to a User model
        ref: 'User', // Change 'User' to the actual model name if different
        required: true,
    },
    // category: {
    //     type: String,
    //     required: true,
    // },
    // costing: {
    //     type: String,
    //     required: true,
    // },
    vote: {
        type: Number,
        default: 0,
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false, // Default value is false
    },

    // modify for group post. (user, group,isGroupPost)
    isGroupPost:{
        type:Boolean,
        default:false
    },
    group:{
        type:mongoose.Schema.Types.ObjectId,
        require:false,
        ref:"page"
    }


}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Post model
const postModel = mongoose.model('Post', postSchema);

export default postModel;
