import { Router } from 'express'
import { jobs } from '../jobs.json' with { type: 'json' }
import { JobsController } from '../controllers/jobs'

export const jobsRouter = Router()
jobsRouter.use(express.json()) // Middleware to parse JSON bodies

//CRUD operations for /jobs endpoint
jobsRouter.get('/', JobsController.getAll)
jobsRouter.get('/:id', JobsController.getById)
jobsRouter.delete('/:id', JobsController.deleteById)
jobsRouter.post('/', JobsController.create)
jobsRouter.put('/:id', JobsController.updateById)
jobsRouter.patch('/:id', JobsController.patchById)