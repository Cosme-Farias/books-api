import { model,Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>({
	email: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,

	},
	lastName: {
		type: String
	},
	password: {
		type: String,
		required: false
	},
	lastLogin: {
		type: Date,
		required: false
	}

},
	{
		timestamps: true,
		versionKey: false
	}
)

const UserModel = model("user",UserSchema);

export default UserModel