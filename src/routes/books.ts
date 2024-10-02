import { Router } from "express"
import { createBook,deleteBook,getBook,getBooks,updateBook } from "../controllers/books"
import { logMiddleware } from "../middlewares/log"
import { promiseWrapper } from "../utils"

const router = Router()

router.get("/",promiseWrapper(getBooks))
router.get("/:id",promiseWrapper(getBook))
router.post("/",promiseWrapper(createBook))
router.patch("/:id",promiseWrapper(updateBook))
router.delete("/:id",promiseWrapper(deleteBook))

export { router }
