import type { User } from "../types/user"
import { SuperAdminDashboard } from "./dashboards/super-admin-dashboard"
import { SupervisorDashboard } from "./dashboards/supervisor-dashboard"
import { SupplierDashboard } from "./dashboards/supplier-dashboard"
import { ClientDashboard } from "./dashboards/client-dashboard"
import { EmployeeDashboard } from "./dashboards/employee-dashboard"

interface DashboardFactoryProps {
  user: User
}

export function DashboardFactory({ user }: DashboardFactoryProps) {
  switch (user.role) {
    case "super-admin":
      return <SuperAdminDashboard />
    case "supervisor":
      return <SupervisorDashboard />
    case "supplier":
      return <SupplierDashboard />
    case "client":
      return <ClientDashboard />
    case "employee":
      return <EmployeeDashboard />
    default:
      return <EmployeeDashboard />
  }
}
