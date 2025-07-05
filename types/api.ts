export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface DashboardStats {
  label: string
  value: string | number
  change: string
  trend: "up" | "down" | "stable"
  icon?: string
}

export interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
  status: "completed" | "pending" | "in-progress"
}

export interface Task {
  id: string
  title: string
  description?: string
  priority: "high" | "medium" | "low"
  status: "completed" | "pending" | "in-progress"
  dueDate: string
  assignedTo?: string
  createdAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold"
  progress: number
  startDate: string
  endDate?: string
  teamMembers: string[]
  budget?: number
  spent?: number
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  avatar?: string
  status: "active" | "inactive" | "on-leave"
  performance: number
  tasksCompleted: number
  joinDate: string
}

export interface Order {
  id: string
  customerName?: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  deliveryDate?: string
  shippingAddress?: string
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minimumRequired: number
  unit: string
  price: number
  supplier: string
  lastRestocked: string
  status: "in-stock" | "low-stock" | "out-of-stock"
}

export interface Invoice {
  id: string
  customerName: string
  amount: number
  status: "paid" | "pending" | "overdue"
  issueDate: string
  dueDate: string
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
}

export interface SystemUser {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "suspended"
  lastLogin: string
  createdAt: string
  permissions: string[]
}

export interface SecurityAlert {
  id: string
  type: "login" | "access" | "system" | "data"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  timestamp: string
  resolved: boolean
  affectedUser?: string
}

export interface AnalyticsData {
  performanceTrends: {
    improvement: string
    period: string
    data: Array<{ name: string; value: number }>
  }
  efficiencyScore: {
    score: number
    maxScore: number
    rating: string
  }
  goalProgress: {
    percentage: number
    status: string
  }
  chartData: Array<{ name: string; value: number }>
  userEngagement: {
    activeUsers: number
    sessionDuration: string
    bounceRate: string
  }
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  timestamp: string
  read: boolean
  actionUrl?: string
}

// Section-specific data interfaces
export interface DashboardData {
  stats: DashboardStats[]
  recentActivity: Activity[]
  notifications: {
    count: number
    items: NotificationItem[]
  }
}

export interface TeamData {
  members: TeamMember[]
  stats: DashboardStats[]
  recentActivity: Activity[]
}

export interface ProjectsData {
  projects: Project[]
  stats: DashboardStats[]
  recentActivity: Activity[]
}

export interface TasksData {
  tasks: Task[]
  stats: DashboardStats[]
  recentActivity: Activity[]
}

export interface InventoryData {
  items: InventoryItem[]
  stats: DashboardStats[]
  lowStockAlerts: InventoryItem[]
}

export interface OrdersData {
  orders: Order[]
  stats: DashboardStats[]
  recentActivity: Activity[]
}

export interface InvoicesData {
  invoices: Invoice[]
  stats: DashboardStats[]
  recentActivity: Activity[]
}

export interface UsersData {
  users: SystemUser[]
  stats: DashboardStats[]
  recentActivity: Activity[]
}

export interface SecurityData {
  alerts: SecurityAlert[]
  stats: DashboardStats[]
  recentActivity: Activity[]
}
