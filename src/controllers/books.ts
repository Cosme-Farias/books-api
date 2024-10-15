import { Request,Response } from "express"
import mongoose from "mongoose"
import { Book } from "../interfaces/book.interface"
import { Search } from "../interfaces/search.interface"
import BookModel from "../models/book"
import { CosmeError,cosmeResponse } from "../utils"

const getBook = async (req: Request,res: Response) => {
	if (!("id" in req.params)) throw new Error("Invalid params")

	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id")

	const book = await BookModel.findById(id)

	if (!book) throw new Error("Book not found")

	return cosmeResponse<Book>(res,200,book)
}

const getBooks = async (req: Request,res: Response) => {
	const books = await BookModel.find({})
	const booksCount = await BookModel.countDocuments({})

	return cosmeResponse<Search<Book>>(res,200,{ count: booksCount,elements: books })
}

const createBook = async (req: Request,res: Response) => {
	console.log(req.body)
	if (!isValidBook(req.body)) {
		throw new CosmeError(400,"No es un libro valido")
	}
	const newBook = await BookModel.create(req.body)

	return cosmeResponse(res,200,newBook)
}

const updateBook = async (req: Request,res: Response) => {
	if (!isValidBook(req.body)) throw new Error("No es un libro válido")
	if (!("id" in req.params)) throw new Error("Invalid params")
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id")

	const book = await BookModel.findByIdAndUpdate(id,req.body,{ new: true })

	if (!book) throw new Error("Book not found")

	return cosmeResponse<Book>(res,200,book)
}

const deleteBook = async (req: Request,res: Response) => {
	if (!("id" in req.params)) throw new Error("Invalid params")
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id")

	const book = await BookModel.findByIdAndDelete(id)

	if (!book) throw new Error("Book not found")

	return cosmeResponse(res,201,{ success: true })
}
export { createBook,deleteBook,getBook,getBooks,updateBook }

function isValidBook(body: any): body is Book {

	const hasValidMandatoryFields = (
		typeof body.title === 'string' &&
		typeof body.author === 'string' &&
		typeof body.category === 'string' &&
		typeof body.publicationDate === "string" &&
		!isNaN(new Date(body.publicationDate).getTime()) &&
		typeof body.pages === 'number'
	);
	// const hasValidSynopsis = body.synopsis === undefined || typeof body.synopsis === 'string';

	// const hasValidIsbn = body.isbn === undefined || typeof body.isbn === 'string';

	return hasValidMandatoryFields
}