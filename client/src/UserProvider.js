import { createContext } from "react"

export const User = {
    connected: false,
    address: null,
}

export const UserContext = createContext(User)
