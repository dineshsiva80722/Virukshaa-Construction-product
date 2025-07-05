import type React from "react"
export type UserRole = "super-admin" | "supervisor" | "supplier" | "client" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  permissions: string[]
  department?: string
  lastLogin?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface NavigationItem {
  id: string
  title: string
  icon: any
  path: string
  badge?: string
  permissions?: string[]
}

export interface DashboardSection {
  id: string
  title: string
  component: React.ComponentType<any>
  permissions?: string[]
}
