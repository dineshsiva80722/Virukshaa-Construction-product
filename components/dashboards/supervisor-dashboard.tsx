"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertCircle, UserPlus, Calendar, CheckCircle, Users } from "lucide-react"
import type { User } from "../../types/user"
import type { DashboardData, TeamData, TasksData } from "../../types/api"
import { useSectionData } from "../../hooks/use-section-data"

interface SupervisorDashboardProps {
  user: User
}

export function SupervisorDashboard({ user }: SupervisorDashboardProps) {
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
    refreshData: refreshDashboard,
  } = useSectionData<DashboardData>("dashboard", user)
  const { data: teamData, loading: teamLoading, refreshData: refreshTeam } = useSectionData<TeamData>("team", user)
  const { data: tasksData, loading: tasksLoading, refreshData: refreshTasks } = useSectionData<TasksData>("tasks", user)

  const refreshAll = () => {
    refreshDashboard()
    refreshTeam()
    refreshTasks()
  }

  if (dashboardLoading || teamLoading || tasksLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Team Supervision</h1>
          <p className="text-muted-foreground">Loading team data...</p>
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
            <h1 className="text-3xl font-bold">Team Supervision</h1>
            <p className="text-muted-foreground">Error loading team data</p>
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
  const teamMembers = teamData?.members.length || 0
  const activeMembers = teamData?.members.filter((member) => member.status === "active").length || 0
  const completedTasks = tasksData?.tasks.filter((task) => task.status === "completed").length || 0
  const pendingTasks = tasksData?.tasks.filter((task) => task.status === "pending").length || 0
  const overdueTasks =
    tasksData?.tasks.filter((task) => new Date(task.dueDate) < new Date() && task.status !== "completed").length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Supervision</h1>
          <p className="text-muted-foreground">Monitor and manage your team's performance</p>
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

      {/* Team Performance from API */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Track individual employee progress ({teamMembers} team members from API)</CardDescription>
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

            {teamData?.members.slice(0, 6).map((member) => (
              <div key={member.id} className="grid grid-cols-4 gap-4 text-sm">
                <div>{member.name}</div>
                <div>{member.tasksCompleted}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span>{member.performance}%</span>
                    <Badge
                      variant={
                        member.performance >= 90 ? "default" : member.performance >= 70 ? "secondary" : "destructive"
                      }
                    >
                      {member.performance >= 90 ? "Excellent" : member.performance >= 70 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Badge
                    variant={
                      member.status === "active" ? "default" : member.status === "on-leave" ? "outline" : "destructive"
                    }
                  >
                    {member.status}
                  </Badge>
                </div>
              </div>
            )) || <div className="text-center py-4 text-muted-foreground">No team members found</div>}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Task Overview from API */}
        <Card>
          <CardHeader>
            <CardTitle>Task Overview</CardTitle>
            <CardDescription>Current task status from API</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed Tasks</span>
                <Badge variant="default">{completedTasks}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Tasks</span>
                <Badge variant="secondary">{pendingTasks}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Overdue Tasks</span>
                <Badge variant="destructive">{overdueTasks}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Tasks</span>
                <Badge variant="outline">{tasksData?.tasks.length || 0}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity from API */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Team Activity</CardTitle>
            <CardDescription>Latest team actions and updates</CardDescription>
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
          <CardDescription>Common supervisory tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col">
              <UserPlus className="h-6 w-6 mb-2" />
              Assign Task
              <Badge variant="secondary" className="mt-1 text-xs">
                {pendingTasks} pending
              </Badge>
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <CheckCircle className="h-6 w-6 mb-2" />
              Review Tasks
              {overdueTasks > 0 && (
                <Badge variant="destructive" className="mt-1 text-xs">
                  {overdueTasks} overdue
                </Badge>
              )}
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              Team Report
              <Badge variant="default" className="mt-1 text-xs">
                {activeMembers} active
              </Badge>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
