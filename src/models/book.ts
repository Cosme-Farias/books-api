import { Schema,Types,model,Model } from "mongoose";
import { Book } from "../interfaces/book.interface";

const BookSchema = new Schema<Book>({
	author: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true

	},
	pages: {
		type: Number,
		required: true

	},
	title: {
		type: String,
		required: true,
		unique: true
	},
	isbn: {
		type: String
	},
	publicationDate: {
		type: Date
	},
	synopsis: {
		type: String
	}
},
	{
		timestamps: true,
		versionKey: false
	}
)

const BookModel = model("book",BookSchema);

export default BookModel