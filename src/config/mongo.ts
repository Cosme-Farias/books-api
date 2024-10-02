import "dotenv/config"
import { connect } from "mongoose"

const dbConnect = async (): Promise<void> => {
	const MONGO_URL = <string>process.env.MONGO_URL

	await connect(MONGO_URL)
}

export default dbConnect