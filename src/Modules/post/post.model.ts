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
    category: {
        type: String,
        required: true,
    },
    costing: {
        type: String,
        required: true,
    },
    vote: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false, // Default value is false
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Post model
const postModel = mongoose.model('Post', postSchema);

export default postModel;
