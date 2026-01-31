import express from 'express'
import cors from 'cors'

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
app.use(express.json()) // Middleware to parse JSON bodies
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})