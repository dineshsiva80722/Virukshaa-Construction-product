"use client";

import { useState } from "react";
import { Pencil, Trash2, Search, Filter, Users } from "lucide-react";
import EditEmployeeModal from "./EditEmployeeModal";
import { Employee } from "./type";

const departments = ["All Department", "Construction", "Electrician", "Plumber", "Operations","Carpenter", "Mason", "Supervisor", "Manager"];
const statuses = ["Status", "Active", "Inactive"];

export default function EmployeeList({
  employees,
  onUpdate,
  onDelete,
}: {
  employees: Employee[];
  onUpdate: (updated: Employee) => void;
  onDelete: (id: number) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All Department");
  const [filterStatus, setFilterStatus] = useState("Status");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesName = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "All Department" || emp.department === filterDept;
    const matchesStatus = filterStatus === "Status" || emp.status === filterStatus;
    return matchesName && matchesDept && matchesStatus;
  });

  return (
    <div className="p-3 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Employee List</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>Total: {employees.length} employees</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 md:mb-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search employees by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(filterDept !== "All Department" || filterStatus !== "Status") && (
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                Showing {filteredEmployees.length} of {employees.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Supervisor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Salary</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{emp.name}</div>
                        <div className="text-sm text-gray-500">Joined: {emp.joined}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{emp.email}</div>
                      <div className="text-sm text-gray-500">{emp.phone}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{emp.role}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{emp.department}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{emp.supervisor}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      ₹{parseInt(emp.salary).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          emp.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(emp.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredEmployees.map((emp) => (
          <div key={emp.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{emp.name}</h3>
                <p className="text-sm text-gray-600">{emp.role} • {emp.department}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(emp)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(emp.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Email:</span>
                <p className="font-medium text-gray-900 break-all">{emp.email}</p>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <p className="font-medium text-gray-900">{emp.phone}</p>
              </div>
              <div>
                <span className="text-gray-500">Supervisor:</span>
                <p className="font-medium text-gray-900">{emp.supervisor}</p>
              </div>
              <div>
                <span className="text-gray-500">Salary:</span>
                <p className="font-medium text-gray-900">₹{parseInt(emp.salary).toLocaleString("en-IN")}</p>
              </div>
              <div>
                <span className="text-gray-500">Joined:</span>
                <p className="font-medium text-gray-900">{emp.joined}</p>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-1 ${
                    emp.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {emp.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-600">
            {searchTerm || filterDept !== "All Department" || filterStatus !== "Status"
              ? "Try adjusting your search or filters"
              : "No employees have been added yet"}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onCancel={() => setEditingEmployee(null)}
          onSave={(updated) => {
            onUpdate(updated);
            setEditingEmployee(null);
          }}
        />
      )}
    </div>
  );
}