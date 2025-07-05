import {
  LayoutDashboard,
  BarChart3,
  FolderOpen,
  CheckSquare,
  Users,
  Settings,
  Package,
  ShoppingCart,
  Truck,
  FileText,
  CreditCard,
  MessageSquare,
  Calendar,
  Clock,
  Shield,
  Database,
  Bell,
} from "lucide-react"
import type { UserRole, NavigationItem } from "../types/user"

export const navigationConfig: Record<UserRole, NavigationItem[]> = {
  "super-admin": [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "analytics", title: "Analytics", icon: BarChart3, path: "/analytics" },
    { id: "users", title: "User Management", icon: Users, path: "/users" },
    { id: "security", title: "Security", icon: Shield, path: "/security" },
    { id: "database", title: "Database", icon: Database, path: "/database" },
    { id: "settings", title: "System Settings", icon: Settings, path: "/settings" },
  ],

  supervisor: [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "team", title: "Team Management", icon: Users, path: "/team" },
    { id: "projects", title: "Projects", icon: FolderOpen, path: "/projects" },
    { id: "tasks", title: "Task Overview", icon: CheckSquare, path: "/tasks" },
    { id: "analytics", title: "Reports", icon: BarChart3, path: "/analytics" },
    { id: "schedule", title: "Schedule", icon: Calendar, path: "/schedule" },
  ],

  supplier: [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "inventory", title: "Inventory", icon: Package, path: "/inventory" },
    { id: "orders", title: "Orders", icon: ShoppingCart, path: "/orders", badge: "5" },
    { id: "deliveries", title: "Deliveries", icon: Truck, path: "/deliveries" },
    { id: "invoices", title: "Invoices", icon: FileText, path: "/invoices" },
    { id: "payments", title: "Payments", icon: CreditCard, path: "/payments" },
  ],

  client: [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "orders", title: "My Orders", icon: ShoppingCart, path: "/orders" },
    { id: "invoices", title: "Invoices", icon: FileText, path: "/invoices" },
    { id: "projects", title: "Projects", icon: FolderOpen, path: "/projects" },
    { id: "support", title: "Support", icon: MessageSquare, path: "/support" },
    { id: "notifications", title: "Notifications", icon: Bell, path: "/notifications", badge: "3" },
  ],

  employee: [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "tasks", title: "My Tasks", icon: CheckSquare, path: "/tasks", badge: "4" },
    { id: "timesheet", title: "Timesheet", icon: Clock, path: "/timesheet" },
    { id: "schedule", title: "Schedule", icon: Calendar, path: "/schedule" },
    { id: "team", title: "Team", icon: Users, path: "/team" },
    { id: "messages", title: "Messages", icon: MessageSquare, path: "/messages", badge: "2" },
  ],
}
