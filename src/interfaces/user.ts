import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avatar?: string;
    boards: mongoose.Types.ObjectId[];
}