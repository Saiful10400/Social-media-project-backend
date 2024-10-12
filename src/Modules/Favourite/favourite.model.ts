import {  Schema, model } from 'mongoose';
import { Tfavourite } from './favourite.interface';



const favouriteSchema = new Schema<Tfavourite>({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const favouriteModel = model<Tfavourite>('Favourite', favouriteSchema);

export default favouriteModel;
