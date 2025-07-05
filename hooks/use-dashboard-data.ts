"use client"

import { useState, useEffect, useCallback } from "react"
import type { User } from "../types/user"
import type { UserDashboardData } from "../types/api"
import { apiService } from "../services/api"

export function useDashboardData(user: User | null) {
  const [data, setData] = useState<UserDashboardData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const response = await apiService.getDashboardData(user)

      if (response.success) {
        setData(response.data)
      } else {
        setError(response.error || "Failed to fetch data")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }, [user])

  const refreshData = useCallback(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  return {
    data,
    loading,
    error,
    refreshData,
  }
}
