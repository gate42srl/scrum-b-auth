import mongoose from "mongoose"
import config from "config"

// Database connection string
const DATABASE_URI: string = config.get("MONGODB_URL")

// Amount of milliseconds to wait for a re-connection to the database
const RECONNECT_TIMEOUT = 5000

// Handle connection error then disconnect all connections
mongoose.connection.on("error", (error) => {
  // Log the error
  console.error("Error in MongoDb connection:", error)
  // Disconnect all connections
  mongoose.disconnect()
})

// Handle mongoose disconnections. Then try to reconnect
mongoose.connection.on("disconnected", function () {
  // Convert the reconnect timeout in seconds
  const timeout = RECONNECT_TIMEOUT / 1000

  // Get the current date and time in UTC
  const disconnectionDate = new Date().toISOString()

  // Log the disconnection
  console.log(`MongoDB disconnected! Trying to reconnect after ${timeout} sec...`, disconnectionDate)

  // After RECONNECT_TIMEOUT milliseconds try to reconnect to db
  setTimeout(connectToDB, RECONNECT_TIMEOUT)
})

/**
 * @function connectToDB
 * @description Utility function that establish a connection to to the database
 */
export const connectToDB = async () => {
  // Throw an error if the database connection string is not defined
  if (!DATABASE_URI) throw new Error("DATABASE_URI is not defined!")

  // Connect to the database
  const connection = await mongoose.connect(DATABASE_URI).catch(console.error)

  // Get the current date and time in UTC
  const connectionDate = new Date().toISOString()

  // Log the successful connection
  console.log("MongoDB connected...", connectionDate)

  // Return the connection
  return connection
}
