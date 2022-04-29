export interface UserInfo {
    id: string
    email: string
    user_role: userRoles
    full_name: string
}

export enum userRoles {
    admin = "admin",
    subscriber = "subscriber"
}