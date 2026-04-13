import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { employeeApp } from './APIs/employeeApi.js'
import cors from 'cors'

config()
const app = exp()

app.use(cors())
app.use(exp.json())

// Global DB Connection state (for Serverless)
let cachedConnection = null

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection
  }

  if (!process.env.DB_URL) {
    throw new Error('Please define the DB_URL environment variable in your .env or Vercel settings')
  }

  // Set connect options to handle timeouts better
  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
  }

  cachedConnection = connect(process.env.DB_URL, opts).then((mongoose) => {
    console.log('New DB connection established')
    return mongoose
  })

  return cachedConnection
}

// Middleware to ensure DB is connected before any request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase()
    next()
  } catch (err) {
    next(err)
  }
})

app.use("/employee-api", employeeApp)

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err)
  res.status(500).json({
    message: "A server error occurred",
    reason: err.message || "Unknown error"
  })
})

const port = process.env.PORT || 4000

// Only listen locally if run directly
if (process.env.NODE_ENV !== 'production' && import.meta.url === `file://${process.argv[1]}`) {
  connectToDatabase().then(() => {
    app.listen(port, () => console.log(`local server listening on ${port}`))
  })
}

export default app