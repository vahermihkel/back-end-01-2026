import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const {isLoggedIn} = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <Outlet />
  )
}

export default RequireAuth