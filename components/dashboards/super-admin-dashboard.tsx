import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Database, Shield, BarChart3, Settings, UserPlus, Activity } from "lucide-react"

export function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Administration</h1>
        <p className="text-muted-foreground">Complete system overview and user management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* User Management Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage system users and their roles</CardDescription>
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
              <div>Actions</div>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>John Smith</div>
              <div>john@company.com</div>
              <div>
                <Badge variant="secondary">Supervisor</Badge>
              </div>
              <div>
                <Badge variant="default">Active</Badge>
              </div>
              <div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>Sarah Johnson</div>
              <div>sarah@company.com</div>
              <div>
                <Badge variant="secondary">Employee</Badge>
              </div>
              <div>
                <Badge variant="default">Active</Badge>
              </div>
              <div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>Mike Wilson</div>
              <div>mike@supplier.com</div>
              <div>
                <Badge variant="secondary">Supplier</Badge>
              </div>
              <div>
                <Badge variant="outline">Inactive</Badge>
              </div>
              <div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
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
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
