import { NextFunction,Request,Response } from "express";

export const promiseWrapper = (fn: Function) => async (req: Request,res: Response,next: NextFunction) => {
	try {
		console.log("WRAPPER")
		await fn(req,res,next);
	} catch (error) {
		console.error(`Error in ${fn.name}:`,error);
		next(error);
	}
};
