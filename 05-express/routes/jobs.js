import { Router } from 'express'
import { JobsController } from '../controllers/jobs.js'
import express from 'express'
import { validateJob, validateParcialJob } from '../schemas/jobs.js'

export const jobsRouter = Router()
jobsRouter.use(express.json()) // Middleware to parse JSON bodies

function validateCreateJob(req, res, next) {
    const result = validateJob(req.body)
    if (!result.success) {
        return res.status(400).json({ error: result.error })
    }
    next()
}

function validateUpdateJob(req, res, next) {
    const result = validateParcialJob(req.body)
    if (!result.success) {
        return res.status(400).json({ error: result.error })
    }
    next()
}

//CRUD operations for /jobs endpoint
jobsRouter.get('/', JobsController.getAll)
jobsRouter.get('/:id', JobsController.getById)
jobsRouter.delete('/:id', JobsController.deleteById)
jobsRouter.post('/', validateCreateJob, JobsController.create)
jobsRouter.put('/:id', validateUpdateJob, JobsController.updateById)
jobsRouter.patch('/:id', validateUpdateJob, JobsController.patchById)