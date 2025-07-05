import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, CheckCircle, Clock, AlertTriangle, UserPlus, Calendar } from "lucide-react"

export function SupervisorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Supervision</h1>
        <p className="text-muted-foreground">Monitor and manage your team's performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Need immediate action</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Track individual employee progress</CardDescription>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Assign Task
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 font-medium text-sm border-b pb-2">
              <div>Employee</div>
              <div>Tasks Completed</div>
              <div>Performance</div>
              <div>Status</div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>Alice Cooper</div>
              <div>15/18</div>
              <div>
                <Badge variant="default">Excellent</Badge>
              </div>
              <div>
                <Badge variant="default">Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>Bob Martinez</div>
              <div>12/15</div>
              <div>
                <Badge variant="secondary">Good</Badge>
              </div>
              <div>
                <Badge variant="default">Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>Carol Davis</div>
              <div>8/12</div>
              <div>
                <Badge variant="destructive">Needs Improvement</Badge>
              </div>
              <div>
                <Badge variant="outline">On Leave</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common supervisory tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col">
              <UserPlus className="h-6 w-6 mb-2" />
              Assign Task
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <CheckCircle className="h-6 w-6 mb-2" />
              Review Tasks
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              Team Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
