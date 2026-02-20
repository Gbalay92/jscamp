import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

before(async () => {
  const { default: app } = await import('./app.js')
    server = app.listen(PORT, () => {
        console.log(`Test server running on ${BASE_URL}`)
    })
})

after(() => {
  server.close(() => {
    console.log('Test server stopped')
  })
})