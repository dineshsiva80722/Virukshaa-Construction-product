import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Calendar, MessageSquare, Plus, Play } from "lucide-react"

export function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Workspace</h1>
        <p className="text-muted-foreground">Your daily tasks and schedule</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">4 completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.5</div>
            <p className="text-xs text-muted-foreground">Out of 8 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Tasks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>Your assigned tasks for today</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 font-medium text-sm border-b pb-2">
              <div>Task</div>
              <div>Priority</div>
              <div>Due Time</div>
              <div>Status</div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm items-center">
              <div>Review project documentation</div>
              <div>
                <Badge variant="destructive">High</Badge>
              </div>
              <div>10:00 AM</div>
              <div>
                <Badge variant="default">Completed</Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm items-center">
              <div>Team meeting preparation</div>
              <div>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div>2:00 PM</div>
              <div>
                <Badge variant="secondary">In Progress</Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm items-center">
              <div>Update client presentation</div>
              <div>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div>4:00 PM</div>
              <div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm items-center">
              <div>Submit weekly report</div>
              <div>
                <Badge variant="default">Low</Badge>
              </div>
              <div>5:00 PM</div>
              <div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common daily tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col">
              <Play className="h-6 w-6 mb-2" />
              Start Timer
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Plus className="h-6 w-6 mb-2" />
              Add Task
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Calendar className="h-6 w-6 mb-2" />
              View Schedule
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <MessageSquare className="h-6 w-6 mb-2" />
              Team Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
