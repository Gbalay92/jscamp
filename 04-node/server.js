import { createServer } from 'node:http'
import { json } from 'node:stream/consumers'
import { randomUUID } from 'node:crypto'

process.loadEnvFile()
const port = process.env.PORT ?? 3000

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
]

const sendJson = (res, statusCode, data) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.statusCode = statusCode
    return res.end(JSON.stringify(data))
}

const server = createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`)

    const { method, url } = req
    if (method === 'GET') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        if (url === '/') {
            return res.end('Hello from Node!\n')
        } else if (url === '/health') {
            return res.end('OK\n')
        } else if (url === '/json') {
            return sendJson(res, 200, { message: 'Hello, JSON!' })
        } else if (url === '/users') {
            return sendJson(res, 200, users)
        } else {
            res.statusCode = 404
            return res.end('Not Found\n')
        }
    } else if (method === 'POST' && url === '/users') {
        const body = await json(req)
        if (!body || !body.name) {
            return sendJson(res, 400, { error: 'Name is required' })
        }
        const newUser = {
            id: randomUUID(),
            name: body.name
        }
        users.push(newUser)
        return sendJson(res, 201, { message: 'User created' })
    }
})


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})