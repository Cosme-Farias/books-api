import { model,Schema } from "mongoose";
import { User,userTypes } from "../interfaces/user.interface";



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
	role: {
		type: String,
		required: true,
		enum: userTypes
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