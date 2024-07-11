import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    avatar?: string;
    boards: mongoose.Types.ObjectId[];
}