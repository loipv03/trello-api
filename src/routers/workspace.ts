import express from 'express'
import validate from '../utils/errorUtils'
import authenticate from '../middlewares/authenticate'
import { workspaceSchema } from '../validations/workspace'
import createWorkspace from '../controllers/workspaces/createWorkspace'
import updateWorkspace from '../controllers/workspaces/updateWorkspace'
import getWorkspace from '../controllers/workspaces/getWorkspace'

const workspaceRouter = express.Router()

workspaceRouter.post('/workspaces', authenticate, validate(workspaceSchema), createWorkspace);
workspaceRouter.patch('/workspace/:id', authenticate, validate(workspaceSchema), updateWorkspace);
workspaceRouter.get('/workspaces', authenticate, getWorkspace);
// workspaceRouter.put('/workspaces/:id', validateRequest(workspaceSchema), updateWorkspace);
// workspaceRouter.delete('/workspaces/:id', deleteWorkspace);

export default workspaceRouter