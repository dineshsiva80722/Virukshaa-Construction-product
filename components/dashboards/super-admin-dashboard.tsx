"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertCircle, UserPlus, Settings, BarChart3, Shield } from "lucide-react"
import type { User } from "../../types/user"
import type { DashboardData, UsersData, SecurityData } from "../../types/api"
import { useSectionData } from "../../hooks/use-section-data"

interface SuperAdminDashboardProps {
  user: User
}

export function SuperAdminDashboard({ user }: SuperAdminDashboardProps) {
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
    refreshData: refreshDashboard,
  } = useSectionData<DashboardData>("dashboard", user)
  const { data: usersData, loading: usersLoading, refreshData: refreshUsers } = useSectionData<UsersData>("users", user)
  const {
    data: securityData,
    loading: securityLoading,
    refreshData: refreshSecurity,
  } = useSectionData<SecurityData>("security", user)

  const refreshAll = () => {
    refreshDashboard()
    refreshUsers()
    refreshSecurity()
  }

  if (dashboardLoading || usersLoading || securityLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Administration</h1>
          <p className="text-muted-foreground">Loading system data...</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (dashboardError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Administration</h1>
            <p className="text-muted-foreground">Error loading system data</p>
          </div>
          <Button onClick={refreshAll} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>

        <Card>
          <CardContent className="flex items-center gap-2 p-6">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-600">{dashboardError}</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!dashboardData) return null

  // Calculate dynamic stats from API data
  const activeUsers = usersData?.users.filter((user) => user.status === "active").length || 0
  const inactiveUsers = usersData?.users.filter((user) => user.status === "inactive").length || 0
  const criticalAlerts =
    securityData?.alerts.filter((alert) => alert.severity === "critical" && !alert.resolved).length || 0
  const totalUsers = usersData?.users.length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Administration</h1>
          <p className="text-muted-foreground">Complete system overview and user management</p>
        </div>
        <Button onClick={refreshAll} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {/* Dynamic Stats Cards from API */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{stat.change}</span>
                <Badge
                  variant={stat.trend === "up" ? "default" : stat.trend === "down" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Management Table from API */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage system users and their roles ({totalUsers} total users from API)</CardDescription>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 font-medium text-sm border-b pb-2">
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Status</div>
              <div>Last Login</div>
            </div>

            {usersData?.users.slice(0, 8).map((user) => (
              <div key={user.id} className="grid grid-cols-5 gap-4 text-sm">
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
                <div>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : user.status === "inactive" ? "outline" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(user.lastLogin).toLocaleDateString()}</div>
              </div>
            )) || <div className="text-center py-4 text-muted-foreground">No users found</div>}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Security Alerts from API */}
        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>{criticalAlerts} critical alerts requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityData?.alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        alert.severity === "critical"
                          ? "bg-red-500"
                          : alert.severity === "high"
                            ? "bg-orange-500"
                            : alert.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge variant={alert.resolved ? "secondary" : "destructive"} className="text-xs">
                    {alert.resolved ? "Resolved" : alert.severity}
                  </Badge>
                </div>
              )) || <div className="text-center py-4 text-muted-foreground">No security alerts</div>}
            </div>
          </CardContent>
        </Card>

        {/* System Activity from API */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>Latest system events and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-500"
                        : activity.status === "in-progress"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions with Dynamic Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col">
              <UserPlus className="h-6 w-6 mb-2" />
              Add User
              <Badge variant="secondary" className="mt-1 text-xs">
                {totalUsers} total
              </Badge>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Settings className="h-6 w-6 mb-2" />
              System Settings
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <BarChart3 className="h-6 w-6 mb-2" />
              View Reports
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Shield className="h-6 w-6 mb-2" />
              Security Audit
              {criticalAlerts > 0 && (
                <Badge variant="destructive" className="mt-1 text-xs">
                  {criticalAlerts} alerts
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
