import express from "express"
import cors from "cors"
import morgan from "morgan"
import "express-async-errors"
////////////////////////////////////////////////////////////
// Setting config dir for windows (issue to be solved...)
process.env["NODE_CONFIG_DIR"] = "./src/config"
///////////////////////////////////////////////////////////
import config from "config"
// Import routers
import router from "../routes/auth/routes"
// Import error handler
import { errorHandler } from "../middleware/error"

// Define the port to run on
const PORT = config.get("PORT") || 3000

// Create a new express application instance
const app = express()

// Catching uncaught exceptions and rejected promises

// NOTE: In the next future we should stop the process in these cases and restart it in
// prod and we should log these in a file or on db

process.on("uncaughtException", (err) => {
  // This only works for synchronous code
  console.log("unhandledException error...", err)
})

process.on("unhandledRejection", async (err, promise) => {
  // This only works for synchronous code
  console.log("unhandledRejection error...")
})

app.use(
  morgan(
    ':req[X-Forwarded-For] - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
  )
)

// Cors middleware
app.use(cors())

// Body parser middleware to parse the request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Product routes
app.use("/", router)

// Error middleware
app.use(errorHandler)

// add * for non matching apis

/**
 * Start the server
 */
export const start = () => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
  })
}
