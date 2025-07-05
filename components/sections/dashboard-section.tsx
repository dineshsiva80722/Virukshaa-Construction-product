import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { User } from "../../types/user"

interface DashboardSectionProps {
  user: User
}

export function DashboardSection({ user }: DashboardSectionProps) {
  const getDashboardData = () => {
    switch (user.role) {
      case "super-admin":
        return {
          title: "System Overview",
          stats: [
            { label: "Total Users", value: "1,234", change: "+12%", trend: "up" },
            { label: "Active Sessions", value: "89", change: "+5%", trend: "up" },
            { label: "System Health", value: "99.9%", change: "0%", trend: "stable" },
            { label: "Security Alerts", value: "3", change: "-2", trend: "down" },
          ],
        }
      case "supervisor":
        return {
          title: "Team Performance",
          stats: [
            { label: "Team Members", value: "12", change: "+1", trend: "up" },
            { label: "Active Projects", value: "8", change: "+2", trend: "up" },
            { label: "Completed Tasks", value: "156", change: "+23", trend: "up" },
            { label: "Pending Reviews", value: "7", change: "-3", trend: "down" },
          ],
        }
      case "supplier":
        return {
          title: "Supply Chain Status",
          stats: [
            { label: "Active Orders", value: "24", change: "+6", trend: "up" },
            { label: "Inventory Items", value: "156", change: "-12", trend: "down" },
            { label: "Deliveries Today", value: "8", change: "+3", trend: "up" },
            { label: "Revenue (Month)", value: "$45,231", change: "+18%", trend: "up" },
          ],
        }
      case "client":
        return {
          title: "Account Overview",
          stats: [
            { label: "Active Orders", value: "3", change: "+1", trend: "up" },
            { label: "Pending Invoices", value: "2", change: "0", trend: "stable" },
            { label: "Total Spent", value: "$12,450", change: "+$2,100", trend: "up" },
            { label: "Support Tickets", value: "1", change: "-2", trend: "down" },
          ],
        }
      default:
        return {
          title: "My Workspace",
          stats: [
            { label: "Tasks Today", value: "6", change: "+2", trend: "up" },
            { label: "Hours Logged", value: "6.5", change: "+0.5", trend: "up" },
            { label: "Meetings", value: "2", change: "0", trend: "stable" },
            { label: "Messages", value: "3", change: "+1", trend: "up" },
          ],
        }
    }
  }

  const data = getDashboardData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}. Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat, index) => (
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Task completed</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New message received</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Meeting scheduled</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Completion Rate</span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "87%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Efficiency</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
