import { useContext } from "react"
import { AuthContext } from "./AuthContext"

function Header() {
  const { user, login } = useContext(AuthContext)
  if (!user) 
    return (
      <div className="header">
        Please login
        <button onClick={() => login({name: 'Joe Smith', email: 'joe@example.com'})}>Login</button>
      </div>
    )
  return (
    <div className="header">
      email: {user?.email}
    </div>
  )
}

export default Header