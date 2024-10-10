import { Request,Response } from "express"
import { Search } from "../interfaces/search.interface"
import { User } from "../interfaces/user.interface"
import UserModel from "../models/user"
import { CosmeError,cosmeResponse } from "../utils"
interface NewUser {
	firstName: string
	lastName: string
	email: string
	// password: string
}
const getUsers = async (req: Request,res: Response) => {
	const users = await UserModel.find({},{ password: 0 });
	const usersCount = await UserModel.countDocuments({})

	return cosmeResponse<Search<User>>(res,200,{ count: usersCount,elements: users })
}

const createUser = async (req: Request,res: Response) => {
	if (!isValidUser(req.body)) {
		throw new CosmeError(400,"No es un usuario válido")
	}
	const newBook = await UserModel.create(req.body)

	return cosmeResponse(res,200,newBook)
}

export { createUser,getUsers }

function isValidUser(body: any): body is NewUser {
	const hasValidMandatoryFields = (
		body.firstName && body.lastName && body.email &&
		typeof body.firstName === 'string' &&
		typeof body.lastName === 'string' &&
		typeof body.email === 'string'
	);

	return hasValidMandatoryFields
}