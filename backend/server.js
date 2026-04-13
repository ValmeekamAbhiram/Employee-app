import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import { employeeApp } from './APIs/employeeApi.js'
import cors from 'cors'

config()
const app=exp()

// Allow all origins in production if needed, or specific ones
app.use(cors())
app.use(exp.json())

app.use("/employee-api", employeeApp)

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err.stack);
    res.status(500).json({
        message: "A server error occurred",
        reason: err.message
    });
});

// Connect to DB and export app
const connectDB = async () => {
    try {
        await connect(process.env.DB_URL)
        console.log("DB connection successful")
    } catch (err) {
        console.log("err in Db connection:", err)
    }
}

// Only listen locally if this file is run directly
if (process.env.NODE_ENV !== 'production' && import.meta.url === `file://${process.argv[1]}`) {
    connectDB().then(() => {
        app.listen(port, () => console.log(`server listening to ${port}...`))
    })
} else {
    // For serverless, connect once
    connectDB()
}

export default app