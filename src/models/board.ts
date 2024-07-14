import mongoose, { Schema } from 'mongoose';
import { IBoard } from '../interfaces/board';

const BoardSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    workspace: {
        type: mongoose.Types.ObjectId,
        ref: 'Workspace',
        required: true,
    },
    // lists: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'List',
    //     },
    // ],
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
    visibility: {
        type: String,
        enum: ['private', 'public'],
        default: 'private',
    },
}, {
    versionKey: false, timestamps: true
});

const Board = mongoose.model<IBoard>('Board', BoardSchema);

export default Board;