import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function NameTag() {
  const {user} = useContext(AuthContext);
  if (!user) return <div>Please login</div>
  return (
    <div>
      <h3>Name Tag</h3>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
    </div>
  )
}

export default NameTag