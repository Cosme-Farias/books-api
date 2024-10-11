import { FilterQuery } from "mongoose";
import { Role,User,userTypes } from "../interfaces/user.interface";

interface UserQuery {
	$and?: FilterQuery<User>[];
}

const filterRules: { [key: string]: (value: any) => FilterQuery<User> } = {
	search: (value: string) => {
		const regex = { $regex: value.trim(),$options: "i" };
		return {
			$or: [
				{ firstName: regex },
				{ lastName: regex },
				{ email: regex },
				{ role: regex },
			],
		};
	},
	role: (value: string) => {
		if (userTypes.includes(value as Role)) {
			return { role: value as Role };
		}
		return {};
	},
};

const queryParser = (query: any) => {
	// PAGINATION
	const page = Number(query.page) || 1;
	const limit = Number(query.elementsPerPage) || 5;
	const skip = (page - 1) * limit;

	// FILTERS
	let filter: UserQuery = {};

	const filters = query.filters || {};

	for (const [key,value] of Object.entries(filters)) {
		if (value !== undefined && value !== null && filterRules[key]) {
			const parsedFilter = filterRules[key](value);
			if (Object.keys(parsedFilter).length > 0) {
				filter.$and = filter.$and || [];
				filter.$and.push(parsedFilter);
			}
		}
	}

	if (filter.$and && filter.$and.length === 0) {
		delete filter.$and;
	}

	return { skip,limit,filter };
};

export { queryParser };
