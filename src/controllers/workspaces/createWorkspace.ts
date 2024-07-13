import { Response, NextFunction } from "express";
import Workspace from '../../models/workspace'
import { AuthenticatedRequest } from "../../interfaces/user";
import { IWorkspace } from "../../interfaces/workspace";
import { IError } from "../../interfaces/error";


const createWorkspace = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { name }: IWorkspace = req.body
        const user_id = req.user_id

        const workspaceExists = await Workspace.findOne({ name, 'members.userId': user_id });
        if (workspaceExists) return next({
            status: 400,
            message: "Workspace already exists"
        } as IError)

        const newWorkspace = await Workspace.create({
            ...req.body,
            members: [
                {
                    userId: user_id,
                    role: 'admin'
                }
            ],
        })
        return res.status(200).json({
            status: 200,
            message: "Create a successful workspace",
            newWorkspace
        })

    } catch (error) {
        next(error)
    }
}

export default createWorkspace