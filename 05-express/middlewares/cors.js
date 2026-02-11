import cors from 'cors'

//app.use(cors) // Enable CORS for all origins
const allowedOrigins = ['http://localhost:3000', 'http://example.com']

export const corsMiddleware = ({ acceptedOrigins = allowedOrigins } = {}) => {
    return cors({
        origin: function(origin, callback) {
            if (!origin || acceptedOrigins.includes(origin)) {
                return callback(null, true) //NULL means no error
            } else {
                return callback(new Error('Not allowed by CORS'))
            }
        }
    })
}


