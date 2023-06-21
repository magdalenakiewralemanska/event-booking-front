import { User } from "./User"

export type UserContextType = {
    currentUser: User,
    userModifier: (user: User | null) => void;
}