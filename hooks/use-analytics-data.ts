"use client"

import { useState, useEffect, useCallback } from "react"
import type { User } from "../types/user"
import { apiService } from "../services/api"

export function useAnalyticsData(user: User | null) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalyticsData = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const response = await apiService.getAnalyticsData(user)

      if (response.success) {
        setData(response.data)
      } else {
        setError(response.error || "Failed to fetch analytics data")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchAnalyticsData()
  }, [fetchAnalyticsData])

  return {
    data,
    loading,
    error,
    refetch: fetchAnalyticsData,
  }
}
