import mongoose, { Schema } from 'mongoose';
import { TuserPayment } from './UserPayment.interface';


// Define the Mongoose Schema
const TuserPaymentSchema: Schema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amount: { type: String, required: true },
    tnxId: { type: String, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true },
}, {
    timestamps: true // This will automatically add `createdAt` and `updatedAt` fields
});

// Create the model
const UserPaymentModel = mongoose.model<TuserPayment>('Payment', TuserPaymentSchema);

export default UserPaymentModel;
