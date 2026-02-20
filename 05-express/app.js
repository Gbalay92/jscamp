import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { jobsRouter } from './routes/jobs.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(corsMiddleware())
app.use(express.json()) // Middleware to parse JSON bodies

app.use('/jobs', jobsRouter)

if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

export default app