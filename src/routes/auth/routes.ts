import { Router } from "express"

// Init the router
const router = Router()

// Import middleware functions
import { validateBody } from "../../middleware"
// Import validation functions
import { validateSignup } from "../../validation"
// Import handlers
import { signupHandler } from "./handler"

// API
router.post("/signup", validateBody(validateSignup), signupHandler)

export default router