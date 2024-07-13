import { Response, NextFunction } from "express";
import Workspace from '../../models/workspace'
import { AuthenticatedRequest } from "../../interfaces/user";
import { IWorkspace } from "../../interfaces/workspace";
import { IError } from "../../interfaces/error";


const updateWorkspace = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { name }: IWorkspace = req.body
        const user_id = req.user_id
        const workspace_id = req.params.id as string

        const workspace = await Workspace.find({ 'members.userId': user_id });

        const currentWorkspace = workspace.find(item => String(item._id) === workspace_id)


        const isAdmin = currentWorkspace && currentWorkspace.members.some(member => member.userId.toString() === user_id && member.role === 'admin');
        if (!isAdmin) return next({
            status: 403,
            message: "The workspace does not exist or you do not have permission to update this workspace"
        } as IError)

        const workspaceExists = workspace.some(workspace => String(workspace._id) !== workspace_id && workspace.name === name);

        if (workspaceExists) {
            return next({
                status: 400,
                message: "Workspace already exists"
            } as IError)
        }

        const updatedWorkspace = await Workspace.findByIdAndUpdate(workspace_id, req.body, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            status: 200,
            message: "Update successful workspace",
            updatedWorkspace
        })

    } catch (error) {
        next(error)
    }
}

export default updateWorkspace