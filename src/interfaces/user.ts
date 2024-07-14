import { Request } from 'express';
import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    avatar?: string;
    isActive: boolean
    activationCode: string
}

export interface AuthenticatedRequest extends Request {
    user_id?: string
}