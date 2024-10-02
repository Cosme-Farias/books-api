import express,{ NextFunction,Request,Response } from "express"
import cors from "cors"
import "dotenv/config"
import { router } from "./routes"
import dbConnect from "./config/mongo"


const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
dbConnect().then(() => console.log("MongoDB ready"))

app.use((err: any,req: Request,res: Response,_: NextFunction) => {
	const statusCode = err.statusCode || 500;

	if (statusCode === 500) {
		return res.status(500).json({ success: false,message: "Unexpected error" });
	}

	return res.status(statusCode).json({ success: false,message: err.message || "Unexpected error" });
});

app.listen(PORT,() => console.log(`Listening on port ${PORT}`))