"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertCircle, Plus, Play, Calendar, MessageSquare } from "lucide-react"
import type { User } from "../../types/user"
import type { DashboardData, TasksData } from "../../types/api"
import { useSectionData } from "../../hooks/use-section-data"

interface EmployeeDashboardProps {
  user: User
}

export function EmployeeDashboard({ user }: EmployeeDashboardProps) {
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
    refreshData: refreshDashboard,
  } = useSectionData<DashboardData>("dashboard", user)
  const { data: tasksData, loading: tasksLoading, refreshData: refreshTasks } = useSectionData<TasksData>("tasks", user)

  const refreshAll = () => {
    refreshDashboard()
    refreshTasks()
  }

  if (dashboardLoading || tasksLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Workspace</h1>
          <p className="text-muted-foreground">Loading your workspace data...</p>
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
            <h1 className="text-3xl font-bold">My Workspace</h1>
            <p className="text-muted-foreground">Error loading workspace data</p>
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
  const totalTasks = tasksData?.tasks.length || 0
  const completedTasks = tasksData?.tasks.filter((task) => task.status === "completed").length || 0
  const todayTasks =
    tasksData?.tasks.filter((task) => new Date(task.dueDate).toDateString() === new Date().toDateString()).length || 0
  const overdueTasks =
    tasksData?.tasks.filter((task) => new Date(task.dueDate) < new Date() && task.status !== "completed").length || 0
  const unreadMessages = dashboardData.notifications.items.filter((item) => !item.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Workspace</h1>
          <p className="text-muted-foreground">Your daily tasks and schedule</p>
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

      {/* Today's Tasks from API */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>Your assigned tasks from API ({totalTasks} total tasks)</CardDescription>
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
              <div>Due Date</div>
              <div>Status</div>
            </div>

            {tasksData?.tasks.slice(0, 6).map((task) => (
              <div key={task.id} className="grid grid-cols-4 gap-4 text-sm items-center">
                <div>
                  <p className="font-medium">{task.title}</p>
                  {task.description && <p className="text-xs text-muted-foreground">{task.description}</p>}
                </div>
                <div>
                  <Badge
                    variant={
                      task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="text-xs">{new Date(task.dueDate).toLocaleDateString()}</div>
                <div>
                  <Badge
                    variant={
                      task.status === "completed" ? "default" : task.status === "in-progress" ? "secondary" : "outline"
                    }
                  >
                    {task.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            )) || <div className="text-center py-4 text-muted-foreground">No tasks assigned</div>}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Task Summary from API */}
        <Card>
          <CardHeader>
            <CardTitle>Task Summary</CardTitle>
            <CardDescription>Your task progress overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed Tasks</span>
                <Badge variant="default">{completedTasks}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Due Today</span>
                <Badge variant="secondary">{todayTasks}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Overdue Tasks</span>
                <Badge variant="destructive">{overdueTasks}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Tasks</span>
                <Badge variant="outline">{totalTasks}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

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
      </div>

      {/* Quick Actions with Dynamic Data */}
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
              <Badge variant="secondary" className="mt-1 text-xs">
                {totalTasks} total
              </Badge>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Calendar className="h-6 w-6 mb-2" />
              View Schedule
              {todayTasks > 0 && (
                <Badge variant="default" className="mt-1 text-xs">
                  {todayTasks} today
                </Badge>
              )}
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <MessageSquare className="h-6 w-6 mb-2" />
              Team Chat
              {unreadMessages > 0 && (
                <Badge variant="destructive" className="mt-1 text-xs">
                  {unreadMessages} unread
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
