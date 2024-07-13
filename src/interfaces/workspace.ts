import mongoose, { Document } from 'mongoose';

export interface IWorkspace extends Document {
    name: string;
    description?: string;
    visibility: 'private' | 'public';
    members: {
        userId: mongoose.Types.ObjectId;
        role: 'admin' | 'normal' | 'observer';
    }[];
    boards: mongoose.Types.ObjectId[];
}
