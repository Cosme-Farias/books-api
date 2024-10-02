import { Response } from "express"

export const cosmeSuccess = (res: Response) => {
	return res.status(200).json({ success: true })
}

