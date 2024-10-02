import { NextFunction,Request,Response } from "express";

export const logMiddleware = (req: Request,res: Response,next: NextFunction) => {
	const header = req.headers
	// console.log("midleeewareeee")
	// console.log(header["user-agent"]);

	next()
}

