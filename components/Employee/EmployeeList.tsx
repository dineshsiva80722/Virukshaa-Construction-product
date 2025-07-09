"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="border p-2 rounded"
        >
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <div className="ml-auto text-sm text-gray-600">
          Showing {filteredEmployees.length} employee(s)
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left font-semibold">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Department</th>
                <th className="p-3">Supervisor</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Joined</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.phone}</td>
                  <td className="p-3">{emp.role}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">{emp.supervisor}</td>
                  <td className="p-3">₹{parseInt(emp.salary).toLocaleString("en-IN")}</td>
                  <td className="p-3">{emp.joined}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3 flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(emp.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
