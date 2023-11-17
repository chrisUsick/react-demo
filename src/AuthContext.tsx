import { createContext, useState } from "react"

type User = {
  name: string
  email: string
}
type AuthContextType = {
  user: User | null
  login: (user: User) => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  // user state 
  const [user, setUser] = useState<User | null>(null)
  function login(user: User) {
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children }
    </AuthContext.Provider>
  )
}