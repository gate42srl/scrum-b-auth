import { Router } from "express"

// Init the router
const router = Router()

// Import middleware functions
import { validateBody, checkToken } from "../../middleware"
// Import validation functions
import { validateSignup, validateSignin, validateRecovery, validateRefresh } from "../../validation"
// Import handlers
import { signupHandler, signinHandler, recoveryHandler, refreshHandler } from "./handler"

// API
router.post("/signup", validateBody(validateSignup), signupHandler)
router.post("/signin", validateBody(validateSignin), signinHandler)
router.post("/recovery", validateBody(validateRecovery), recoveryHandler)
router.post("/refresh", checkToken(), validateBody(validateRefresh), refreshHandler) // Manca validation

export default router
