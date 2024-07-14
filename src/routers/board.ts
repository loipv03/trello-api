import express from 'express'
import validate from '../utils/errorUtils'
import authenticate from '../middlewares/authenticate'
import boardSchema from '../validations/board'
import createBoard from '../controllers/board/createBoard'

const boardRouter = express.Router()

boardRouter.post('/board', authenticate, validate(boardSchema), createBoard);
// boardRouter.patch('/board/:id', authenticate, validate(boardSchema), updateWorkspace);
// boardRouter.get('/board', authenticate, getWorkspace);
// boardRouter.put('/board/:id', validateRequest(boardSchema), updateWorkspace);
// boardRouter.delete('/board/:id', deleteWorkspace);

export default boardRouter