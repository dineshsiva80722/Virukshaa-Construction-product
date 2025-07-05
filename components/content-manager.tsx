import type { User } from "../types/user"
import { DashboardSection } from "./sections/dashboard-section"
import { AnalyticsSection } from "./sections/analytics-section"
import { TasksSection } from "./sections/tasks-section"
import { TeamSection } from "./sections/team-section"
import { ProjectsSection } from "./sections/projects-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ContentManagerProps {
  user: User
  activeSection: string
}

function GenericSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Integration Available</CardTitle>
          <CardDescription>This section will use API data when implemented</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section is ready for API integration. The data structure and loading states are prepared.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function ContentManager({ user, activeSection }: ContentManagerProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection user={user} />
      case "analytics":
        return <AnalyticsSection user={user} />
      case "tasks":
        return <TasksSection user={user} />
      case "team":
        return <TeamSection user={user} />
      case "projects":
        return <ProjectsSection user={user} />
      case "inventory":
        return (
          <GenericSection title="Inventory Management" description="Monitor stock levels and supplies (API Ready)" />
        )
      case "orders":
        return <GenericSection title="Order Management" description="Process and track orders (API Ready)" />
      case "invoices":
        return <GenericSection title="Invoice Management" description="Manage invoices and payments (API Ready)" />
      case "users":
        return <GenericSection title="User Management" description="Manage system users and permissions (API Ready)" />
      case "security":
        return <GenericSection title="Security Center" description="Monitor system security and access (API Ready)" />
      case "settings":
        return <GenericSection title="Settings" description="Configure system preferences (API Ready)" />
      default:
        return <DashboardSection user={user} />
    }
  }

  return <div className="flex-1 p-6">{renderContent()}</div>
}
