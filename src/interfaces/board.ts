import mongoose, { Document } from 'mongoose';

export interface IBoard extends Document {
    name: string;
    description?: string;
    workspace: mongoose.Types.ObjectId;
    // lists: mongoose.Types.ObjectId[];
    members: {
        userId: mongoose.Types.ObjectId;
        role: 'admin' | 'normal' | 'observer';
    }[];
    visibility: 'private' | 'public';
}