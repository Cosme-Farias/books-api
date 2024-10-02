import { Request,Response } from "express";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt,generateToken,verified } from "../utils/jwt";
import { Auth } from "../interfaces/auth.interface";
import { CosmeError,cosmeResponse,cosmeSuccess } from "../utils";


const register = async (req: Request,res: Response) => {
	if (!isRegistrationBody(req.body)) throw new CosmeError(400,"Invalid params")
	const { email,password } = req.body
	const user = await UserModel.findOne({ email })
	if (user) {
		throw new CosmeError(400,"Ya existe una cuenta con el email")
	}
	const passwordHash = await encrypt(password)

	await UserModel.create({ email,password: passwordHash })

	return cosmeSuccess(res)
}

const login = async (req: Request,res: Response) => {
	if (!isLoginBody(req.body)) throw new Error("Invalid login data")

	const { email,password } = req.body
	const existentUser = await UserModel.findOne({ email })
	if (!existentUser || !(await verified(password,existentUser.password))) {
		throw new Error("Usuario o contraseña incorrecta")
	}

	const userWithoutPassword = existentUser.toObject({ transform: function (_,ret) { delete ret.password; } });

	const token = generateToken(existentUser._id.toString())

	return cosmeResponse(res,200,{ user: userWithoutPassword })
}

export { login,register };

function isRegistrationBody(body: any): body is User {
	return body.email && body.password && typeof body.email === "string" && typeof body.password === "string"
}

function isLoginBody(body: any): body is Auth {
	return body.email && body.password && typeof body.email === "string" && typeof body.password === "string"
}