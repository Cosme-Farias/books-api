import { model,Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},

},
	{
		timestamps: true,
		versionKey: false
	}
)

const UserModel = model("user",UserSchema);

export default UserModel