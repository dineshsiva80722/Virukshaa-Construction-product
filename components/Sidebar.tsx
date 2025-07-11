"use client";

import {
  LayoutDashboard,
  Users,
  Truck,
  Briefcase,
  Crown,
  Shield,
  Database,
  Settings,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import EmployeeList from "./Employee/EmployeeList";
import AddEmployee from "./Employee/AddEmployee";
import EditEmployeeModal from "./Employee/EditEmployeeModal";
import { Employee as EmployeeType } from "./Employee/type";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Analytics", icon: ClipboardList },
  { label: "User Management", icon: Users },
  { label: "Supplier Management", icon: Truck },
  { label: "Client Management", icon: Briefcase },
  { label: "Supervisor Management", icon: Crown },
  { label: "Employee Management", icon: Users },
  { label: "Procurement Tasks", icon: ClipboardList },
  { label: "Security", icon: Shield },
  { label: "Database", icon: Database },
  { label: "System Settings", icon: Settings },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Employee Management");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeType | null>(null);

  const handleAddEmployee = (newEmployee: EmployeeType) => {
    setEmployees((prev) => [...prev, newEmployee]);
    setShowAddForm(false);
  };

  const handleEditEmployee = (updated: EmployeeType) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === updated.id ? updated : emp)));
    setEditingEmployee(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
  className={`${
    sidebarOpen ? "block" : "hidden"
  } md:block w-64 border-r bg-white flex flex-col justify-between z-10 fixed md:relative h-full`}
>

        <div className="fixed">
          <div className="p-4 font-bold text-lg flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm">
                D
              </div>
              <span>Dashboard <span className="text-xs text-gray-400 ml-1">v2.0</span></span>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <nav className="px-2 mt-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveItem(item.label);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                  activeItem === item.label
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t text-sm text-gray-600">
          <div className="font-medium">admin</div>
          <div className="text-xs text-gray-500">Super Admin</div>
        </div>
        </div>

        
      </div>

      {/* Content */}
      <div className={`flex-1 p-4 transition-all duration-300 S`}>
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
