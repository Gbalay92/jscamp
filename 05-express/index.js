import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()

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