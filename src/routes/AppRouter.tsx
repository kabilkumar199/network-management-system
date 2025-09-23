import { Routes, Route, Navigate } from "react-router-dom"
import PublicRoute from "@/src/components/routing/PublicRoute"
import PrivateRoute from "@/src/components/routing/PrivateRoute"
import LoginPage from "@/src/pages/Login"
import DashboardPage from "@/src/pages/Dashboard"
import InventoryPage from "@/app/inventory/page"
import InventoryDetailRoute from "@/src/pages/InventoryDetail"
import PerformancePage from "@/app/performance/page"
import FaultsPage from "@/app/faults/page"
import SecurityPage from "@/app/security/page"
import TopologyPage from "@/app/topology/page"
import NotFound from "@/src/pages/NotFound"
import ConfigPage from "@/app/config/page"
import BackupsPage from "@/app/backups/page"
import ProvisioningPage from "@/app/provisioning/page"
import FirmwarePage from "@/app/firmware/page"
import SettingsPage from "@/app/settings/page"
import UsersPage from "@/app/users/page"
import ProfilePage from "@/app/profile/page"
import AccountingPage from "@/app/accounting/page"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/:deviceId" element={<InventoryDetailRoute />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/faults" element={<FaultsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/topology" element={<TopologyPage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/backups" element={<BackupsPage />} />
        <Route path="/provisioning" element={<ProvisioningPage />} />
        <Route path="/firmware" element={<FirmwarePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/accounting" element={<AccountingPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}


