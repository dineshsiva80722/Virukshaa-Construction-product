import type { User } from "../types/user"
import type {
  ApiResponse,
  DashboardData,
  AnalyticsData,
  TeamData,
  ProjectsData,
  TasksData,
  InventoryData,
  OrdersData,
  InvoicesData,
  UsersData,
  SecurityData,
  DashboardStats,
  Activity,
  Task,
  Project,
  TeamMember,
  Order,
  InventoryItem,
  Invoice,
  SystemUser,
  SecurityAlert,
  NotificationItem,
} from "../types/api"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock data generators for different sections
class MockDataGenerator {
  static generateStats(section: string, role: string): DashboardStats[] {
    const statsMap: Record<string, Record<string, DashboardStats[]>> = {
      dashboard: {
        "super-admin": [
          { label: "Total Users", value: 1234, change: "+12%", trend: "up" },
          { label: "Active Sessions", value: 89, change: "+5%", trend: "up" },
          { label: "System Health", value: "99.9%", change: "0%", trend: "stable" },
          { label: "Security Alerts", value: 3, change: "-2", trend: "down" },
        ],
        supervisor: [
          { label: "Team Members", value: 12, change: "+1", trend: "up" },
          { label: "Active Projects", value: 8, change: "+2", trend: "up" },
          { label: "Completed Tasks", value: 156, change: "+23", trend: "up" },
          { label: "Pending Reviews", value: 7, change: "-3", trend: "down" },
        ],
        supplier: [
          { label: "Active Orders", value: 24, change: "+6", trend: "up" },
          { label: "Inventory Items", value: 156, change: "-12", trend: "down" },
          { label: "Deliveries Today", value: 8, change: "+3", trend: "up" },
          { label: "Revenue (Month)", value: "$45,231", change: "+18%", trend: "up" },
        ],
        client: [
          { label: "Active Orders", value: 3, change: "+1", trend: "up" },
          { label: "Pending Invoices", value: 2, change: "0", trend: "stable" },
          { label: "Total Spent", value: "$12,450", change: "+$2,100", trend: "up" },
          { label: "Support Tickets", value: 1, change: "-2", trend: "down" },
        ],
        employee: [
          { label: "Tasks Today", value: 6, change: "+2", trend: "up" },
          { label: "Hours Logged", value: 6.5, change: "+0.5", trend: "up" },
          { label: "Meetings", value: 2, change: "0", trend: "stable" },
          { label: "Messages", value: 3, change: "+1", trend: "up" },
        ],
      },
      team: {
        supervisor: [
          { label: "Team Size", value: 12, change: "+1", trend: "up" },
          { label: "Active Members", value: 11, change: "0", trend: "stable" },
          { label: "Avg Performance", value: "87%", change: "+5%", trend: "up" },
          { label: "Team Satisfaction", value: "4.2/5", change: "+0.3", trend: "up" },
        ],
        employee: [
          { label: "Team Members", value: 8, change: "0", trend: "stable" },
          { label: "Shared Projects", value: 3, change: "+1", trend: "up" },
          { label: "Team Tasks", value: 24, change: "+6", trend: "up" },
          { label: "Collaboration Score", value: "92%", change: "+8%", trend: "up" },
        ],
      },
      projects: {
        supervisor: [
          { label: "Total Projects", value: 8, change: "+2", trend: "up" },
          { label: "Active Projects", value: 5, change: "+1", trend: "up" },
          { label: "Completed This Month", value: 3, change: "+1", trend: "up" },
          { label: "On Schedule", value: "75%", change: "+10%", trend: "up" },
        ],
        client: [
          { label: "My Projects", value: 3, change: "+1", trend: "up" },
          { label: "In Progress", value: 2, change: "0", trend: "stable" },
          { label: "Completed", value: 1, change: "+1", trend: "up" },
          { label: "Budget Used", value: "68%", change: "+12%", trend: "up" },
        ],
      },
      tasks: {
        supervisor: [
          { label: "Total Tasks", value: 156, change: "+23", trend: "up" },
          { label: "Completed", value: 134, change: "+20", trend: "up" },
          { label: "In Progress", value: 15, change: "+2", trend: "up" },
          { label: "Overdue", value: 7, change: "-3", trend: "down" },
        ],
        employee: [
          { label: "My Tasks", value: 12, change: "+3", trend: "up" },
          { label: "Completed", value: 8, change: "+2", trend: "up" },
          { label: "In Progress", value: 3, change: "+1", trend: "up" },
          { label: "Due Today", value: 1, change: "0", trend: "stable" },
        ],
      },
      inventory: {
        supplier: [
          { label: "Total Items", value: 156, change: "+12", trend: "up" },
          { label: "In Stock", value: 134, change: "+8", trend: "up" },
          { label: "Low Stock", value: 15, change: "+3", trend: "up" },
          { label: "Out of Stock", value: 7, change: "-2", trend: "down" },
        ],
      },
      orders: {
        supplier: [
          { label: "Total Orders", value: 89, change: "+12", trend: "up" },
          { label: "Pending", value: 24, change: "+6", trend: "up" },
          { label: "Processing", value: 18, change: "+3", trend: "up" },
          { label: "Completed", value: 47, change: "+3", trend: "up" },
        ],
        client: [
          { label: "My Orders", value: 8, change: "+2", trend: "up" },
          { label: "Pending", value: 3, change: "+1", trend: "up" },
          { label: "Shipped", value: 2, change: "0", trend: "stable" },
          { label: "Delivered", value: 3, change: "+1", trend: "up" },
        ],
      },
    }

    return statsMap[section]?.[role] || []
  }

  static generateActivities(section: string, count = 5): Activity[] {
    const activities = [
      { type: "task", description: "Task completed: Review project documentation", status: "completed" },
      { type: "message", description: "New message received from team member", status: "pending" },
      { type: "meeting", description: "Meeting scheduled for tomorrow", status: "pending" },
      { type: "system", description: "Profile settings updated", status: "completed" },
      { type: "project", description: "Project milestone reached", status: "completed" },
      { type: "order", description: "New order received", status: "pending" },
      { type: "inventory", description: "Stock level updated", status: "completed" },
      { type: "user", description: "New user registered", status: "pending" },
    ]

    return activities.slice(0, count).map((activity, index) => ({
      id: `activity-${index}`,
      ...activity,
      timestamp: new Date(Date.now() - index * 60 * 60 * 1000).toISOString(),
    })) as Activity[]
  }

  static generateTasks(role: string, count = 10): Task[] {
    const taskTemplates = [
      { title: "Review project documentation", priority: "high" },
      { title: "Update client presentation", priority: "medium" },
      { title: "Submit weekly report", priority: "high" },
      { title: "Team meeting preparation", priority: "low" },
      { title: "Code review for new feature", priority: "medium" },
      { title: "Update system documentation", priority: "low" },
      { title: "Client feedback analysis", priority: "high" },
      { title: "Performance optimization", priority: "medium" },
    ]

    return taskTemplates.slice(0, count).map((template, index) => ({
      id: `task-${index}`,
      ...template,
      description: `Complete ${template.title.toLowerCase()}`,
      status: Math.random() > 0.7 ? "completed" : Math.random() > 0.5 ? "in-progress" : "pending",
      dueDate: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - index * 12 * 60 * 60 * 1000).toISOString(),
    })) as Task[]
  }

  static generateProjects(role: string, count = 6): Project[] {
    const projectTemplates = [
      { name: "Website Redesign", description: "Complete overhaul of company website" },
      { name: "Mobile App Development", description: "New mobile application for customers" },
      { name: "Database Migration", description: "Migrate to new database system" },
      { name: "Security Audit", description: "Comprehensive security review" },
      { name: "API Integration", description: "Third-party API integration" },
      { name: "Performance Optimization", description: "System performance improvements" },
    ]

    return projectTemplates.slice(0, count).map((template, index) => ({
      id: `project-${index}`,
      ...template,
      status: Math.random() > 0.7 ? "completed" : Math.random() > 0.5 ? "active" : "on-hold",
      progress: Math.floor(Math.random() * 100),
      startDate: new Date(Date.now() - (30 + index * 10) * 24 * 60 * 60 * 1000).toISOString(),
      teamMembers: [`Member ${index + 1}`, `Member ${index + 2}`],
      budget: 10000 + index * 5000,
      spent: Math.floor((10000 + index * 5000) * Math.random()),
    })) as Project[]
  }

  static generateTeamMembers(role: string, count = 12): TeamMember[] {
    const names = [
      "Alice Cooper",
      "Bob Martinez",
      "Carol Davis",
      "David Wilson",
      "Eve Johnson",
      "Frank Brown",
      "Grace Lee",
      "Henry Taylor",
      "Ivy Chen",
      "Jack Smith",
      "Kate Anderson",
      "Liam Garcia",
    ]

    return names.slice(0, count).map((name, index) => ({
      id: `member-${index}`,
      name,
      email: `${name.toLowerCase().replace(" ", ".")}@company.com`,
      role: Math.random() > 0.7 ? "Senior Developer" : Math.random() > 0.5 ? "Developer" : "Junior Developer",
      department: Math.random() > 0.5 ? "Engineering" : "Design",
      status: Math.random() > 0.9 ? "on-leave" : Math.random() > 0.95 ? "inactive" : "active",
      performance: Math.floor(Math.random() * 40) + 60,
      tasksCompleted: Math.floor(Math.random() * 50) + 10,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    })) as TeamMember[]
  }

  static generateOrders(role: string, count = 15): Order[] {
    const customers = ["Acme Corp", "BuildCo Ltd", "TechStart Inc", "Global Solutions", "Metro Construction"]
    const items = [
      { name: "Construction Materials", price: 150 },
      { name: "Steel Rods", price: 200 },
      { name: "Cement Bags", price: 25 },
      { name: "Sand", price: 30 },
      { name: "Gravel", price: 40 },
    ]

    return Array.from({ length: count }, (_, index) => ({
      id: `ORD-${String(index + 1).padStart(3, "0")}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      items: [
        {
          name: items[Math.floor(Math.random() * items.length)].name,
          quantity: Math.floor(Math.random() * 10) + 1,
          price: items[Math.floor(Math.random() * items.length)].price,
        },
      ],
      total: Math.floor(Math.random() * 5000) + 500,
      status:
        Math.random() > 0.8
          ? "delivered"
          : Math.random() > 0.6
            ? "shipped"
            : Math.random() > 0.4
              ? "processing"
              : "pending",
      orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    })) as Order[]
  }

  static generateInventoryItems(count = 20): InventoryItem[] {
    const items = [
      { name: "Steel Rods", category: "Construction", unit: "pieces", price: 25 },
      { name: "Cement Bags", category: "Construction", unit: "bags", price: 15 },
      { name: "Sand", category: "Construction", unit: "cubic yards", price: 30 },
      { name: "Gravel", category: "Construction", unit: "tons", price: 45 },
      { name: "Bricks", category: "Construction", unit: "pieces", price: 2 },
      { name: "Paint", category: "Finishing", unit: "gallons", price: 35 },
      { name: "Tiles", category: "Finishing", unit: "sq ft", price: 8 },
      { name: "Pipes", category: "Plumbing", unit: "feet", price: 12 },
    ]

    return items.slice(0, count).map((item, index) => {
      const currentStock = Math.floor(Math.random() * 100)
      const minimumRequired = Math.floor(Math.random() * 20) + 5

      return {
        id: `item-${index}`,
        ...item,
        currentStock,
        minimumRequired,
        supplier: `Supplier ${(index % 3) + 1}`,
        lastRestocked: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: currentStock === 0 ? "out-of-stock" : currentStock < minimumRequired ? "low-stock" : "in-stock",
      }
    }) as InventoryItem[]
  }

  static generateInvoices(count = 10): Invoice[] {
    const customers = ["Acme Corp", "BuildCo Ltd", "TechStart Inc", "Global Solutions", "Metro Construction"]

    return Array.from({ length: count }, (_, index) => ({
      id: `INV-${String(index + 1).padStart(4, "0")}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      amount: Math.floor(Math.random() * 10000) + 1000,
      status: Math.random() > 0.7 ? "paid" : Math.random() > 0.5 ? "pending" : "overdue",
      issueDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          description: "Professional Services",
          quantity: 1,
          rate: Math.floor(Math.random() * 5000) + 1000,
          amount: Math.floor(Math.random() * 5000) + 1000,
        },
      ],
    })) as Invoice[]
  }

  static generateUsers(count = 25): SystemUser[] {
    const names = [
      "John Smith",
      "Sarah Johnson",
      "Mike Wilson",
      "Lisa Anderson",
      "Tom Brown",
      "Emma Davis",
      "Chris Lee",
      "Anna Taylor",
      "Mark Garcia",
      "Julia Martinez",
    ]
    const roles = ["Admin", "Manager", "Developer", "Designer", "Analyst"]

    return Array.from({ length: count }, (_, index) => ({
      id: `user-${index}`,
      name: names[index % names.length],
      email: `user${index}@company.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: Math.random() > 0.9 ? "inactive" : Math.random() > 0.95 ? "suspended" : "active",
      lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      permissions: ["read", "write", Math.random() > 0.5 ? "admin" : "user"].filter(Boolean),
    })) as SystemUser[]
  }

  static generateSecurityAlerts(count = 8): SecurityAlert[] {
    const alertTypes = ["login", "access", "system", "data"] as const
    const severities = ["low", "medium", "high", "critical"] as const
    const messages = [
      "Suspicious login attempt detected",
      "Unauthorized access attempt",
      "System vulnerability found",
      "Data breach attempt blocked",
      "Multiple failed login attempts",
      "Unusual network activity",
      "Security policy violation",
      "Malware detection alert",
    ]

    return Array.from({ length: count }, (_, index) => ({
      id: `alert-${index}`,
      type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      resolved: Math.random() > 0.3,
      affectedUser: Math.random() > 0.5 ? `user${Math.floor(Math.random() * 10)}@company.com` : undefined,
    })) as SecurityAlert[]
  }

  static generateNotifications(count = 5): NotificationItem[] {
    const notifications = [
      { title: "New Message", message: "You have a new message from your team", type: "info" },
      { title: "Task Due Soon", message: "Project review is due tomorrow", type: "warning" },
      { title: "Task Completed", message: "Your task has been completed successfully", type: "success" },
      { title: "System Alert", message: "System maintenance scheduled", type: "error" },
      { title: "New Assignment", message: "You have been assigned a new project", type: "info" },
    ]

    return notifications.slice(0, count).map((notification, index) => ({
      id: `notification-${index}`,
      ...notification,
      timestamp: new Date(Date.now() - index * 60 * 60 * 1000).toISOString(),
      read: Math.random() > 0.5,
    })) as NotificationItem[]
  }
}

// Enhanced API Service Class
export class ApiService {
  private static instance: ApiService

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  // Dashboard Data
  async getDashboardData(user: User): Promise<ApiResponse<DashboardData>> {
    try {
      await delay(500)

      const data: DashboardData = {
        stats: MockDataGenerator.generateStats("dashboard", user.role),
        recentActivity: MockDataGenerator.generateActivities("dashboard", 5),
        notifications: {
          count: Math.floor(Math.random() * 10),
          items: MockDataGenerator.generateNotifications(5),
        },
      }

      return { success: true, data, message: "Dashboard data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as DashboardData, error: "Failed to fetch dashboard data" }
    }
  }

  // Analytics Data
  async getAnalyticsData(user: User): Promise<ApiResponse<AnalyticsData>> {
    try {
      await delay(400)

      const data: AnalyticsData = {
        performanceTrends: {
          improvement: "+23.5%",
          period: "Last 30 days",
          data: [
            { name: "Jan", value: 400 },
            { name: "Feb", value: 300 },
            { name: "Mar", value: 600 },
            { name: "Apr", value: 800 },
            { name: "May", value: 700 },
          ],
        },
        efficiencyScore: {
          score: 8.7,
          maxScore: 10,
          rating: "Excellent",
        },
        goalProgress: {
          percentage: 78,
          status: "On track",
        },
        chartData: [
          { name: "Performance", value: 85 },
          { name: "Efficiency", value: 92 },
          { name: "Quality", value: 88 },
          { name: "Satisfaction", value: 94 },
        ],
        userEngagement: {
          activeUsers: 1234,
          sessionDuration: "4m 32s",
          bounceRate: "23%",
        },
      }

      return { success: true, data, message: "Analytics data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as AnalyticsData, error: "Failed to fetch analytics data" }
    }
  }

  // Team Data
  async getTeamData(user: User): Promise<ApiResponse<TeamData>> {
    try {
      await delay(600)

      const data: TeamData = {
        members: MockDataGenerator.generateTeamMembers(user.role, 12),
        stats: MockDataGenerator.generateStats("team", user.role),
        recentActivity: MockDataGenerator.generateActivities("team", 6),
      }

      return { success: true, data, message: "Team data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as TeamData, error: "Failed to fetch team data" }
    }
  }

  // Projects Data
  async getProjectsData(user: User): Promise<ApiResponse<ProjectsData>> {
    try {
      await delay(500)

      const data: ProjectsData = {
        projects: MockDataGenerator.generateProjects(user.role, 8),
        stats: MockDataGenerator.generateStats("projects", user.role),
        recentActivity: MockDataGenerator.generateActivities("projects", 5),
      }

      return { success: true, data, message: "Projects data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as ProjectsData, error: "Failed to fetch projects data" }
    }
  }

  // Tasks Data
  async getTasksData(user: User): Promise<ApiResponse<TasksData>> {
    try {
      await delay(400)

      const data: TasksData = {
        tasks: MockDataGenerator.generateTasks(user.role, 15),
        stats: MockDataGenerator.generateStats("tasks", user.role),
        recentActivity: MockDataGenerator.generateActivities("tasks", 5),
      }

      return { success: true, data, message: "Tasks data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as TasksData, error: "Failed to fetch tasks data" }
    }
  }

  // Inventory Data
  async getInventoryData(user: User): Promise<ApiResponse<InventoryData>> {
    try {
      await delay(700)

      const items = MockDataGenerator.generateInventoryItems(20)
      const data: InventoryData = {
        items,
        stats: MockDataGenerator.generateStats("inventory", user.role),
        lowStockAlerts: items.filter((item) => item.status === "low-stock" || item.status === "out-of-stock"),
      }

      return { success: true, data, message: "Inventory data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as InventoryData, error: "Failed to fetch inventory data" }
    }
  }

  // Orders Data
  async getOrdersData(user: User): Promise<ApiResponse<OrdersData>> {
    try {
      await delay(500)

      const data: OrdersData = {
        orders: MockDataGenerator.generateOrders(user.role, 20),
        stats: MockDataGenerator.generateStats("orders", user.role),
        recentActivity: MockDataGenerator.generateActivities("orders", 5),
      }

      return { success: true, data, message: "Orders data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as OrdersData, error: "Failed to fetch orders data" }
    }
  }

  // Invoices Data
  async getInvoicesData(user: User): Promise<ApiResponse<InvoicesData>> {
    try {
      await delay(450)

      const data: InvoicesData = {
        invoices: MockDataGenerator.generateInvoices(15),
        stats: MockDataGenerator.generateStats("invoices", user.role),
        recentActivity: MockDataGenerator.generateActivities("invoices", 4),
      }

      return { success: true, data, message: "Invoices data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as InvoicesData, error: "Failed to fetch invoices data" }
    }
  }

  // Users Data (for admin)
  async getUsersData(user: User): Promise<ApiResponse<UsersData>> {
    try {
      await delay(600)

      const data: UsersData = {
        users: MockDataGenerator.generateUsers(30),
        stats: MockDataGenerator.generateStats("users", user.role),
        recentActivity: MockDataGenerator.generateActivities("users", 6),
      }

      return { success: true, data, message: "Users data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as UsersData, error: "Failed to fetch users data" }
    }
  }

  // Security Data
  async getSecurityData(user: User): Promise<ApiResponse<SecurityData>> {
    try {
      await delay(550)

      const data: SecurityData = {
        alerts: MockDataGenerator.generateSecurityAlerts(12),
        stats: MockDataGenerator.generateStats("security", user.role),
        recentActivity: MockDataGenerator.generateActivities("security", 5),
      }

      return { success: true, data, message: "Security data retrieved successfully" }
    } catch (error) {
      return { success: false, data: {} as SecurityData, error: "Failed to fetch security data" }
    }
  }
}

export const apiService = ApiService.getInstance()
