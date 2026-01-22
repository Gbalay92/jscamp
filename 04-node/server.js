import { createServer } from 'node:http'

process.loadEnvFile()
const port = process.env.PORT ?? 3000

const server = createServer((req, res) => {
    console.log(`${req.method} ${req.url}`)

    const { method, url } = req
    if (method !== 'GET') {
        res.statusCode = 405
        return res.end('Method Not Allowed\n')
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    if (url === '/') {
        return res.end('Hello from Node!\n')
    } else if (url === '/health') {
        return res.end('OK\n')
    } else if (url === '/json') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        return res.end(JSON.stringify({ message: 'Hello, JSON!' }))
    } else {
        res.statusCode = 404
        return res.end('Not Found\n')
    }
})


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})