import { Users, Settings, Package, UserCheck, Home } from "lucide-react"
import type { UserRole } from "../types/user"

export interface SidebarItem {
  title: string
  url: string
  icon: any
  badge?: string
}

export interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

export const sidebarConfigs: Record<UserRole, SidebarGroup[]> = {
  "super-admin": [
    {
      label: "Administration",
      items: [{ title: "System Management", url: "/admin", icon: Settings }],
    },
  ],

  supervisor: [
    {
      label: "Management",
      items: [{ title: "Team Supervision", url: "/supervision", icon: Users }],
    },
  ],

  supplier: [
    {
      label: "Supply Chain",
      items: [{ title: "Supply Management", url: "/supply", icon: Package }],
    },
  ],

  client: [
    {
      label: "Client Portal",
      items: [{ title: "Client Dashboard", url: "/client", icon: Home }],
    },
  ],

  employee: [
    {
      label: "Employee Portal",
      items: [{ title: "My Workspace", url: "/workspace", icon: UserCheck }],
    },
  ],
}
