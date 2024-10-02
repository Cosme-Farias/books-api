import { compare,hash } from "bcrypt"
import { sign } from "jsonwebtoken"

const JWT_SECRET = `${process.env.JWT_SECRET}`

const SALT = 4

const encrypt = async (password: string) => {
	return await hash(password,SALT)
}

const verified = async (pass: string,hashPass: string) => {
	return await compare(pass,hashPass)
}

const generateToken = (_id: string) => {
	const jwt = sign({ _id },JWT_SECRET,{ algorithm: "HS256",expiresIn: "7d" })
	return jwt
}

const verifyToken = async () => { }

export { encrypt,verified,generateToken }

