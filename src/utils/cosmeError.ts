export class CosmeError extends Error {
	public statusCode: number;

	constructor(statusCode: number,message: string) {
		super(message);
		this.statusCode = statusCode;
		this.name = "CosmeError";
		Error.captureStackTrace(this,this.constructor);
	}
}

// export const cosmeError = (res: Response,statusCode = 500,errorMessage = "Ocurrió un error inesperado") => {
// 	// console.error(res)
// 	return res.status(statusCode).json({ success: false,message: errorMessage })
// }