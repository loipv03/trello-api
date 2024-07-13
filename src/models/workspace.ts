import mongoose, { Schema } from "mongoose";
import { IWorkspace } from "../interfaces/workspace";

const WorkspaceSchema: Schema = new Schema<IWorkspace>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    visibility: {
        type: String,
        enum: ['private', 'public'],
        default: 'private',
    },
    members: [
        {
            _id: false,
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            role: {
                type: String,
                enum: ['admin', 'normal', 'observer'],
                default: 'normal',
            },
        },
    ],
    boards: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Board',
        },
    ],
}, {
    versionKey: false, timestamps: true
});

const Workspace = mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);

export default Workspace;