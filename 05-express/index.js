import express from 'express'
import { jobs } from './jobs.json' with { type: 'json' }

const PORT = process.env.PORT || 3000

const app = express()


app.get('/get-jobs', (req, res) => {
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
  res.json(paginatedJobs)
})

app.get('/get-job/:id', (req, res) => {
  const jobId = parseInt(req.params.id, 10)
  const job = { id: jobId, title: 'Sample Job', company: 'Sample Company' }
  res.json(job)
})

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