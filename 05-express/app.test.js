import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'

let server
const PORT = 3000
const BASE_URL = `http://localhost:${PORT}`

before(async () => {
  const { default: app } = await import('./app.js')
    server = app.listen(PORT, () => {
        console.log(`Test server running on ${BASE_URL}`)
    })
})

describe('GET /jobs', () => {
  test('should return a list of jobs', async () => {
    const response = await fetch(`${BASE_URL}/jobs`)
    assert.strictEqual(response.status, 200)
    const data = await response.json()
    assert.ok(Array.isArray(data), 'Response should be an array')
    assert.ok(data.length > 0, 'Response array should not be empty')
  })

  test('should filter jobs by technology', async () => {
    const response = await fetch(`${BASE_URL}/jobs?technology=javascript`)
    assert.strictEqual(response.status, 200)
    const json = await response.json()
    assert.ok(json.data.every(job => job.data.technology.includes('javascript')), 'All jobs should include javascript')

  })
})

after(() => {
  server.close(() => {
    console.log('Test server stopped')
  })
})