import { Router } from "express"
import { promiseWrapper } from "../utils/promiseWrapper"
import { createUser,getUsers } from "../controllers/users"

const router = Router()

router.get("/",promiseWrapper(getUsers))
router.post("/",promiseWrapper(createUser))


export { router }

