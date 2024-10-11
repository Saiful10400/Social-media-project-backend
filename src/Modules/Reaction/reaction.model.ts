import mongoose, { Schema } from 'mongoose';
import { Treaction } from './reaction.interface';



const reactionSchema: Schema = new Schema({
    post: { type: String,ref:"Post", required: true }, // Post ID as a string
    reactor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    reactionType: { 
        type: String, 
        enum: ["up", "down", null], // Enum to restrict values
        default: null // Default value can be null
    },
});

// Step 3: Create the Mongoose model
const reactonModel = mongoose.model<Treaction>('Reaction', reactionSchema);

export default reactonModel;
