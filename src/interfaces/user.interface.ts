export enum UserTypes {
	ADMIN = "Admin",
	PANEL = "Panel"
}
export type Role = UserTypes

export interface User {
	email: string
	firstName: string
	lastName: string
	role: Role
	password?: string
	lastLogin?: Date
}

export const userTypes: readonly Role[] = [UserTypes.ADMIN,UserTypes.PANEL]

