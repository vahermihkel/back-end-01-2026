import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

function RequireAdminAuth() {
  const {person} = useContext(AuthContext);

  if (person.role === "CUSTOMER") {
    return <Navigate to="/login" replace />
  }

  return (
    <Outlet />
  )
}

export default RequireAdminAuth