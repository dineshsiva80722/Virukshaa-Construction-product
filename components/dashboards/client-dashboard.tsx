import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, FileText, Clock, CreditCard, Plus, MessageSquare } from "lucide-react"

export function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Client Portal</h1>
        <p className="text-muted-foreground">Manage your orders and account</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Open</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your order history and status</CardDescription>
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

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>#ORD-001</div>
              <div>2024-01-15</div>
              <div>Construction Materials</div>
              <div>$2,450</div>
              <div>
                <Badge variant="secondary">Processing</Badge>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>#ORD-002</div>
              <div>2024-01-10</div>
              <div>Steel & Cement</div>
              <div>$3,200</div>
              <div>
                <Badge variant="default">Delivered</Badge>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>#ORD-003</div>
              <div>2024-01-05</div>
              <div>Tools & Equipment</div>
              <div>$1,800</div>
              <div>
                <Badge variant="default">Completed</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <FileText className="h-6 w-6 mb-2" />
              View Invoices
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Clock className="h-6 w-6 mb-2" />
              Track Orders
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <MessageSquare className="h-6 w-6 mb-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
