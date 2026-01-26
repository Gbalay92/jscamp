import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()

app.get('/get-jobs', (req, res) => {
  const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Tech Corp' },
    { id: 2, title: 'Data Scientist', company: 'Data Inc' },
    { id: 3, title: 'Product Manager', company: 'Business Solutions' },
  ]
  res.json(jobs)
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