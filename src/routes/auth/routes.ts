import { Router } from "express"

// Init the router
const router = Router()

// Import middleware functions
import { validateBody } from "../../middleware"
// Import validation functions
import { validateSignup, validateSignin, validateRecovery } from "../../validation"
// Import handlers
import { signupHandler, signinHandler, recoveryHandler } from "./handler"

// API
router.post("/signup", validateBody(validateSignup), signupHandler)
router.post("/signin", validateBody(validateSignin), signinHandler)
router.post("/recovery", validateBody(validateRecovery), recoveryHandler)

export default router
