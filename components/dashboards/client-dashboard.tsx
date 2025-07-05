"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertCircle, Plus, MessageSquare } from "lucide-react"
import type { User } from "../../types/user"
import type { DashboardData, OrdersData, InvoicesData } from "../../types/api"
import { useSectionData } from "../../hooks/use-section-data"

interface ClientDashboardProps {
  user: User
}

export function ClientDashboard({ user }: ClientDashboardProps) {
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
    refreshData: refreshDashboard,
  } = useSectionData<DashboardData>("dashboard", user)
  const {
    data: ordersData,
    loading: ordersLoading,
    refreshData: refreshOrders,
  } = useSectionData<OrdersData>("orders", user)
  const {
    data: invoicesData,
    loading: invoicesLoading,
    refreshData: refreshInvoices,
  } = useSectionData<InvoicesData>("invoices", user)

  const refreshAll = () => {
    refreshDashboard()
    refreshOrders()
    refreshInvoices()
  }

  if (dashboardLoading || ordersLoading || invoicesLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Client Portal</h1>
          <p className="text-muted-foreground">Loading your account data...</p>
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
            <h1 className="text-3xl font-bold">Client Portal</h1>
            <p className="text-muted-foreground">Error loading client data</p>
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
  const activeOrders =
    ordersData?.orders.filter((order) => order.status === "pending" || order.status === "processing").length || 0
  const pendingInvoices = invoicesData?.invoices.filter((invoice) => invoice.status === "pending").length || 0
  const totalSpent = ordersData?.orders.reduce((sum, order) => sum + order.total, 0) || 0
  const supportTickets = dashboardData.notifications.items.filter(
    (item) => item.type === "warning" || item.type === "error",
  ).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Client Portal</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}. Manage your orders and account</p>
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

      {/* Recent Orders from API */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Your order history and status from API ({ordersData?.orders.length || 0} total orders)
            </CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 font-medium text-sm border-b pb-2">
              <div>Order ID</div>
              <div>Date</div>
              <div>Items</div>
              <div>Amount</div>
              <div>Status</div>
            </div>

            {ordersData?.orders.slice(0, 5).map((order) => (
              <div key={order.id} className="grid grid-cols-5 gap-4 text-sm">
                <div>{order.id}</div>
                <div>{new Date(order.orderDate).toLocaleDateString()}</div>
                <div>{order.items.map((item) => item.name).join(", ")}</div>
                <div>${order.total.toLocaleString()}</div>
                <div>
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "default"
                        : order.status === "shipped"
                          ? "secondary"
                          : order.status === "processing"
                            ? "default"
                            : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            )) || <div className="text-center py-4 text-muted-foreground">No orders found</div>}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity from API */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
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

        {/* Notifications from API */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>{dashboardData.notifications.count} notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.notifications.items.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === "error"
                        ? "bg-red-500"
                        : notification.type === "warning"
                          ? "bg-yellow-500"
                          : notification.type === "success"
                            ? "bg-green-500"
                            : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common client tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Place Order
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <MessageSquare className="h-6 w-6 mb-2" />
              View Invoices
              {pendingInvoices > 0 && (
                <Badge variant="destructive" className="mt-1 text-xs">
                  {pendingInvoices} pending
                </Badge>
              )}
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <RefreshCw className="h-6 w-6 mb-2" />
              Track Orders
              {activeOrders > 0 && (
                <Badge variant="default" className="mt-1 text-xs">
                  {activeOrders} active
                </Badge>
              )}
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <MessageSquare className="h-6 w-6 mb-2" />
              Contact Support
              {supportTickets > 0 && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {supportTickets} tickets
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
