import { Navigate, Outlet } from "react-router-dom"

export default function PublicRoute() {
  const isAuthed = typeof window !== "undefined" && !!localStorage.getItem("username")
  if (isAuthed) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}


