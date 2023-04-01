export type User = {
    _id?: string,
    name: string,
    mobileNumber: string,
    profilePic: string,
    balance: number,
    password: string,
    role: UserRole
}

type UserRole = "admin" | "user";