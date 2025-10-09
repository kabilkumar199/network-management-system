import { ReactNode } from "react";
import { Sidebar } from "../layout/sidebar";
import Header from "./header";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  // Convert pathname into a readable title
  const rawPath = location.pathname;
  const pathParts = rawPath.split("/").filter(Boolean);

  const title =
    pathParts.length > 0
      ? pathParts[pathParts.length - 1].replace(/-/g, " ")
      : "Dashboard";

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title={title.charAt(0).toUpperCase() + title.slice(1)} />
        <main className="flex-1 overflow-auto p-4 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
