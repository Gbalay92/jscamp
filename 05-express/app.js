import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(corsMiddleware())
app.use(express.json()) // Middleware to parse JSON bodies
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})