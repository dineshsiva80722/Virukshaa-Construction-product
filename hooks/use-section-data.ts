"use client"

import { useState, useEffect, useCallback } from "react"
import type { User } from "../types/user"
import type {
  DashboardData,
  AnalyticsData,
  TeamData,
  ProjectsData,
  TasksData,
  InventoryData,
  OrdersData,
  InvoicesData,
  UsersData,
  SecurityData,
} from "../types/api"
import { apiService } from "../services/api"

type SectionData =
  | DashboardData
  | AnalyticsData
  | TeamData
  | ProjectsData
  | TasksData
  | InventoryData
  | OrdersData
  | InvoicesData
  | UsersData
  | SecurityData

export function useSectionData<T extends SectionData>(section: string, user: User | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      let response

      switch (section) {
        case "dashboard":
          response = await apiService.getDashboardData(user)
          break
        case "analytics":
          response = await apiService.getAnalyticsData(user)
          break
        case "team":
          response = await apiService.getTeamData(user)
          break
        case "projects":
          response = await apiService.getProjectsData(user)
          break
        case "tasks":
          response = await apiService.getTasksData(user)
          break
        case "inventory":
          response = await apiService.getInventoryData(user)
          break
        case "orders":
          response = await apiService.getOrdersData(user)
          break
        case "invoices":
          response = await apiService.getInvoicesData(user)
          break
        case "users":
          response = await apiService.getUsersData(user)
          break
        case "security":
          response = await apiService.getSecurityData(user)
          break
        default:
          throw new Error(`Unknown section: ${section}`)
      }

      if (response.success) {
        setData(response.data as T)
      } else {
        setError(response.error || "Failed to fetch data")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }, [section, user])

  const refreshData = useCallback(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refreshData,
  }
}
