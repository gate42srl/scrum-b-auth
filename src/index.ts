import { start } from "./startup/server"
import { connectToDB } from "./startup/db"

// Start the server
start()

// Start the database
connectToDB()
