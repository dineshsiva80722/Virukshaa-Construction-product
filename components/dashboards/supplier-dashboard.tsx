"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertCircle, Plus, FileText, Package, Truck } from "lucide-react"
import type { User } from "../../types/user"
import type { DashboardData, OrdersData, InventoryData } from "../../types/api"
import { useSectionData } from "../../hooks/use-section-data"

interface SupplierDashboardProps {
  user: User
}

export function SupplierDashboard({ user }: SupplierDashboardProps) {
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
    data: inventoryData,
    loading: inventoryLoading,
    refreshData: refreshInventory,
  } = useSectionData<InventoryData>("inventory", user)

  const refreshAll = () => {
    refreshDashboard()
    refreshOrders()
    refreshInventory()
  }

  if (dashboardLoading || ordersLoading || inventoryLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Supply Management</h1>
          <p className="text-muted-foreground">Loading supply data...</p>
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
            <h1 className="text-3xl font-bold">Supply Management</h1>
            <p className="text-muted-foreground">Error loading supply data</p>
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
  const totalRevenue = ordersData?.orders.reduce((sum, order) => sum + order.total, 0) || 0
  const lowStockItems = inventoryData?.lowStockAlerts.length || 0
  const totalItems = inventoryData?.items.length || 0
  const deliveriesToday =
    ordersData?.orders.filter(
      (order) => order.deliveryDate && new Date(order.deliveryDate).toDateString() === new Date().toDateString(),
    ).length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Supply Management</h1>
          <p className="text-muted-foreground">Track inventory, orders, and deliveries</p>
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

      {/* Inventory Management from API */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Current stock levels and alerts ({totalItems} items from API)</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 font-medium text-sm border-b pb-2">
              <div>Item</div>
              <div>Current Stock</div>
              <div>Minimum Required</div>
              <div>Unit</div>
              <div>Status</div>
            </div>

            {inventoryData?.items.slice(0, 6).map((item) => (
              <div key={item.id} className="grid grid-cols-5 gap-4 text-sm">
                <div>{item.name}</div>
                <div>
                  {item.currentStock} {item.unit}
                </div>
                <div>
                  {item.minimumRequired} {item.unit}
                </div>
                <div>{item.unit}</div>
                <div>
                  <Badge
                    variant={
                      item.status === "in-stock" ? "default" : item.status === "low-stock" ? "destructive" : "outline"
                    }
                  >
                    {item.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            )) || <div className="text-center py-4 text-muted-foreground">No inventory items found</div>}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Orders from API */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>{activeOrders} active orders from API</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ordersData?.orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customerName} • ${order.total.toLocaleString()}
                    </p>
                  </div>
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
              )) || <div className="text-center py-4 text-muted-foreground">No recent orders</div>}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts from API */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Alerts</CardTitle>
            <CardDescription>{lowStockItems} items need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryData?.lowStockAlerts.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.currentStock} / {item.minimumRequired} {item.unit}
                    </p>
                  </div>
                  <Badge variant={item.status === "out-of-stock" ? "destructive" : "secondary"}>
                    {item.status.replace("-", " ")}
                  </Badge>
                </div>
              )) || <div className="text-center py-4 text-muted-foreground">All items in stock</div>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions with Dynamic Data */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common supply management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Add Material
              <Badge variant="secondary" className="mt-1 text-xs">
                {totalItems} items
              </Badge>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Truck className="h-6 w-6 mb-2" />
              Schedule Delivery
              {deliveriesToday > 0 && (
                <Badge variant="default" className="mt-1 text-xs">
                  {deliveriesToday} today
                </Badge>
              )}
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <FileText className="h-6 w-6 mb-2" />
              Generate Invoice
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Package className="h-6 w-6 mb-2" />
              Stock Report
              {lowStockItems > 0 && (
                <Badge variant="destructive" className="mt-1 text-xs">
                  {lowStockItems} alerts
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
