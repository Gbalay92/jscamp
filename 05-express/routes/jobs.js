import { Router } from 'express'
import crypto from 'crypto'
import { jobs } from '../jobs.json' with { type: 'json' }
import { JobsController } from '../controllers/jobs'

export const jobsRouter = Router()


//CRUD operations for /jobs endpoint
jobsRouter.get('/', JobsController.getAll)

jobsRouter.get('/:id', (req, res) => {
  const jobId = parseInt(req.params.id, 10)
  const job = jobs.find(job => job.id === jobId)
  if (!job) {
    return res.status(404).json({ error: 'Job not found' })
  }
  res.json(job)
})

jobsRouter.delete('/:id', (req, res) => {
  //TODO
})

jobsRouter.use(express.json()) // Middleware to parse JSON bodies
jobsRouter.post('/', (req, res) => {
  const { title, company, description, technologies, data } = req.body
  const newJob = {
    id: crypto.randomUUID(),
    title,
    company,
    description,
    technologies,
    data
  }

  jobs.push(newJob)
  return res.status(201).json(newJob)
})

jobsRouter.put('/:id', (req, res) => {
  const jobId = req.params.id
  const jobIndex = jobs.findIndex(job => job.id === jobId)
  if (jobIndex === -1) {
    return res.status(404).json({ error: 'Job not found' })
  }
  const { title, company, description, technologies, data } = req.body
  jobs[jobIndex] = {
    ...jobs[jobIndex],
    title,
    company,
    description,
    technologies,
    data
  }
  res.json(jobs[jobIndex])
})

jobsRouter.patch('/:id', (req, res) => {
  const jobId = req.params.id
  const jobIndex = jobs.findIndex(job => job.id === jobId)
  if (jobIndex === -1) {
    return res.status(404).json({ error: 'Job not found' })
  }
  const { title, company, description, technologies, data } = req.body
  jobs[jobIndex] = {
    ...jobs[jobIndex],
    ...(title && { title }),
    ...(company && { company }),
    ...(description && { description }),
    ...(technologies && { technologies }),
    ...(data && { data })
  }
  res.json(jobs[jobIndex])
})
