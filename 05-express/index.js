import express from 'express'
import { jobs } from './jobs.json' with { type: 'json' }
import cors from 'cors'
import crypto from 'crypto'

/*--------------------------------------*/

const PORT = process.env.PORT || 3000
const app = express()
//app.use(cors) // Enable CORS for all origins
const allowedOrigins = ['http://localhost:3000', 'http://example.com']
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true) //NULL means no error
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

//CRUD operations for /jobs endpoint
app.get('/jobs', (req, res) => {
  console.log('req.query:', req.query) // Log query parameters, in the url after '?', example: /get-jobs?location=NYC&fulltime=true
  const { text, title, level, limit = 10, technology, offset = 0} = req.query
  let filteredJobs = jobs
  if (text) {
    const lowerText = text.toLowerCase()
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(lowerText) ||
      job.company.toLowerCase().includes(lowerText) ||
      job.description.toLowerCase().includes(lowerText)
    )
  } 
  if (title) {
    const lowerTitle = title.toLowerCase()
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(lowerTitle)
    )
  }
  if (technology) {
    const lowerTech = technology.toLowerCase()
    filteredJobs = filteredJobs.filter(job => 
      job.technologies.some(tech => tech.toLowerCase() === lowerTech)
    )
  }
  //etc...

  limitNumber = Number(limit) || filteredJobs.length
  offsetNumber = Number(offset) || 0
  paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)
  res.json({ data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber })
})

app.get('/jobs/:id', (req, res) => {
  const jobId = parseInt(req.params.id, 10)
  const job = jobs.find(job => job.id === jobId)
  if (!job) {
    return res.status(404).json({ error: 'Job not found' })
  }
  res.json(job)
})

app.delete('/jobs/:id', (req, res) => {
  //TODO
})

app.use(express.json()) // Middleware to parse JSON bodies
app.post('/jobs', (req, res) => {
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

app.put('/jobs/:id', (req, res) => {
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

app.patch('/jobs/:id', (req, res) => {
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


/*--------------------------------------*/

app.get('/', prevHomeMiddleware, (req, res) => {
  res.send('Hello, Express!')
})

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

const prevHomeMiddleware = (req, res, next) => {
  console.log('Home route accessed')
  next()
}

app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})