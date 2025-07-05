"use client"

import { useState } from "react"
import { Login } from "./components/login"
import { AppSidebar } from "./components/app-sidebar"
import { ContentManager } from "./components/content-manager"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import type { User, AuthState } from "./types/user"

export default function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })
  const [activeSection, setActiveSection] = useState("dashboard")

  const handleLogin = (user: User) => {
    setAuthState({
      user,
      isAuthenticated: true,
    })
    setActiveSection("dashboard")
  }

  const handleLogout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    })
    setActiveSection("dashboard")
  }

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  if (!authState.isAuthenticated || !authState.user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          user={authState.user}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onLogout={handleLogout}
        />
        <SidebarInset className="flex-1 overflow-auto">
          <ContentManager user={authState.user} activeSection={activeSection} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
