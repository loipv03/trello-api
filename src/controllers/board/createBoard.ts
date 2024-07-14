import { Response, NextFunction } from "express";
import Board from '../../models/board'
import Workspace from '../../models/workspace'
import { AuthenticatedRequest } from "../../interfaces/user";
import { IBoard } from "../../interfaces/board";
import { IError } from "../../interfaces/error";


const createBoard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { name, workspace }: IBoard = req.body
        const user_id = req.user_id

        const boardExists = await Board.findOne({ workspace, name });
        if (boardExists) return next({
            status: 400,
            message: "Board already exists"
        } as IError)

        const newBoard = await Board.create({
            ...req.body,
            members: [
                {
                    userId: user_id,
                    role: 'admin'
                }
            ],
        })

        await Workspace.findByIdAndUpdate(newBoard.workspace, {
            $addToSet: {
                boards: newBoard._id,
            },
        });

        return res.status(200).json({
            status: 200,
            message: "Create a successful board",
            newBoard
        })

    } catch (error) {
        next(error)
    }
}

export default createBoard