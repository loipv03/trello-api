import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest, IUser } from '../../interfaces/user'
import Workspace from '../../models/workspace'


const getWorkspace = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user_id = req.user_id

    const workspace = await Workspace.find({ 'members.userId': user_id })

    return res.status(200).json({
        status: 200,
        message: "success",
        workspace
    })

}

export default getWorkspace