import { Router } from "express"
import { login,register } from "../controllers/auth"
import { promiseWrapper } from "../utils/promiseWrapper"

const router = Router()

router.post("/register",promiseWrapper(register))
router.post("/login",promiseWrapper(login))


export { router }

