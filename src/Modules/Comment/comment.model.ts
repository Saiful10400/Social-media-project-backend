import { Schema, model } from 'mongoose';
import { Tcomment } from './comment.interface';


const commentSchema = new Schema<Tcomment>({
  commentor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const CommentModel = model<Tcomment>('Comment', commentSchema);

export default CommentModel;
