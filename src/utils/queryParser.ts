import { FilterQuery } from "mongoose"
import { User } from "../interfaces/user.interface"

interface UserQuery {
	$or?: FilterQuery<User>[]
}

const queryParser = (query: any) => {
	// PAGINATION
	const page = Number(query.page) || 1
	const limit = Number(query.elementsPerPage) || 5
	const skip = (page - 1) * limit
	// FILTERS
	const filter: UserQuery = {}
	if (query.search && typeof query.search === "string") {
		const regex = { $regex: query.search,$options: 'i' }
		filter.$or = [{ firstName: regex },{ lastName: regex },{ email: regex }]
	}

	console.log(query)

	return { skip,limit,filter }
}

export { queryParser }