import { Navigate, Outlet, useLocation } from "react-router-dom";
import AppLayout from "../../../components/layout/AppLayout";

export default function PrivateRoute() {
  const location = useLocation();
  const isAuthed =
    typeof window !== "undefined" && !!localStorage.getItem("username");
  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
