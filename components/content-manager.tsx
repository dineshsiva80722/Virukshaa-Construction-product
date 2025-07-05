import type { User } from "../types/user"
import { DashboardSection } from "./sections/dashboard-section"
import { AnalyticsSection } from "./sections/analytics-section"
import { TasksSection } from "./sections/tasks-section"
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
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This section is under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We're working hard to bring you this feature. Stay tuned for updates!</p>
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
        return <GenericSection title="Team Management" description="Manage your team members and collaboration" />
      case "projects":
        return <GenericSection title="Projects" description="Track and manage your projects" />
      case "inventory":
        return <GenericSection title="Inventory Management" description="Monitor stock levels and supplies" />
      case "orders":
        return <GenericSection title="Order Management" description="Process and track orders" />
      case "users":
        return <GenericSection title="User Management" description="Manage system users and permissions" />
      case "security":
        return <GenericSection title="Security Center" description="Monitor system security and access" />
      case "settings":
        return <GenericSection title="Settings" description="Configure system preferences" />
      default:
        return <DashboardSection user={user} />
    }
  }

  return <div className="flex-1 p-6">{renderContent()}</div>
}
