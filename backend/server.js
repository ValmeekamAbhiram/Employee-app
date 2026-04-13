import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { employeeApp } from './APIs/employeeApi.js'
import cors from 'cors'

config()
const app = exp()

app.use(cors())
app.use(exp.json())

// DB Connection Singleton
let cachedConnection = null

async function connectToDatabase() {
  if (cachedConnection) return cachedConnection

  if (!process.env.DB_URL) {
    throw new Error('Missing DB_URL environment variable')
  }

  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
  }

  cachedConnection = await connect(process.env.DB_URL, opts)
  return cachedConnection
}

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase()
    next()
  } catch (err) {
    console.error('Database connection failed:', err)
    res.status(500).json({ message: 'Database connection failed', reason: err.message })
  }
})

app.use("/employee-api", employeeApp)

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Universal Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err)
  res.status(500).json({
    message: "A server error occurred",
    reason: err.message || "Unknown internal error"
  })
})

const port = process.env.PORT || 4000

// Only listen locally if NODE_ENV is not production
if (process.env.NODE_ENV !== 'production') {
  connectToDatabase().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`))
  }).catch(err => console.error("Local startup failed:", err))
}

export default app