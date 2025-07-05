import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, ShoppingCart, DollarSign, Plus, FileText } from "lucide-react"

export function SupplierDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Supply Management</h1>
        <p className="text-muted-foreground">Track inventory, orders, and deliveries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Pending fulfillment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">In stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deliveries Today</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Current stock levels and alerts</CardDescription>
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

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>Steel Rods</div>
              <div>45 pieces</div>
              <div>20 pieces</div>
              <div>pieces</div>
              <div>
                <Badge variant="default">In Stock</Badge>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>Cement Bags</div>
              <div>8 bags</div>
              <div>15 bags</div>
              <div>bags</div>
              <div>
                <Badge variant="destructive">Low Stock</Badge>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>Sand</div>
              <div>12 cubic yards</div>
              <div>8 cubic yards</div>
              <div>cubic yards</div>
              <div>
                <Badge variant="default">In Stock</Badge>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>Gravel</div>
              <div>0 tons</div>
              <div>5 tons</div>
              <div>tons</div>
              <div>
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
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
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Truck className="h-6 w-6 mb-2" />
              Schedule Delivery
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <FileText className="h-6 w-6 mb-2" />
              Generate Invoice
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Package className="h-6 w-6 mb-2" />
              Stock Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
