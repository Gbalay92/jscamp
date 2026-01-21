import { createServer } from 'node:http'

const port = 3000

const server = createServer((req, res) => {
    console.log(`${req.method} ${req.url}`)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Hello from Node!\n')
})


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})