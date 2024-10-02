import { Response } from "express";

export const cosmeResponse = <T>(res: Response,statusCode: number,data: T,errorMessage?: string) => {
	return res.status(statusCode).json(errorMessage || data)
}

