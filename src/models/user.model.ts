import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
});

export default mongoose.model<IUser>('User', userSchema);
