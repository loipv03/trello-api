import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user';
import bcrypt from 'bcryptjs'

const userSchema: Schema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
}, {
    versionKey: false, timestamps: true
});

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model<IUser>('User', userSchema);
