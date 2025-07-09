"use client";

import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";

type Employee = {
  id: number;
  name: string;
  salary: number;
  status: "Pending" | "Done";
  supervisor: string;
};

const mockEmployees: Employee[] = [
  { id: 1, name: "John Doe", salary: 45000, status: "Done", supervisor: "Mike Wilson" },
  { id: 2, name: "Jane Smith", salary: 48000, status: "Pending", supervisor: "Sarah Johnson" },
  { id: 3, name: "Alice Brown", salary: 47000, status: "Pending", supervisor: "Mike Wilson" },
  { id: 4, name: "Bob Gray", salary: 42000, status: "Done", supervisor: "Sarah Johnson" },
];

export default function Payroll() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Employee>>({});

  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const totalPaid = employees.filter((e) => e.status === "Done").reduce((sum, e) => sum + e.salary, 0);

  const supervisors = Array.from(new Set(employees.map((e) => e.supervisor)));

  const handleStatusChange = (id: number, newStatus: "Pending" | "Done") => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));
  };

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEdit = (emp: Employee) => {
    setEditingId(emp.id);
    setEditData(emp);
  };

  const handleEditChange = (field: keyof Employee, value: string | number) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === editingId ? { ...(e as Employee), ...(editData as Employee) } : e))
    );
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Payroll Summary</h2>

      {/* Top Summary */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 border">
        <p className="text-lg font-semibold text-gray-700">Total Employee Salary</p>
        <div className="flex justify-between mt-2">
          <div>Total Salary: <span className="font-medium">₹{totalSalary.toLocaleString()}</span></div>
          <div>Paid: <span className="font-medium text-green-600">₹{totalPaid.toLocaleString()}</span></div>
          <div>Pending: <span className="font-medium text-red-600">₹{(totalSalary - totalPaid).toLocaleString()}</span></div>
        </div>
      </div>

      {/* Supervisor Overview */}
      <div className="bg-white rounded-lg shadow p-4 border">
        <p className="text-lg font-semibold text-gray-700 mb-4">Supervisor Overview</p>

        {supervisors.map((supervisor) => {
          const team = employees.filter((e) => e.supervisor === supervisor);
          return (
            <div key={supervisor} className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">{supervisor}</h3>
              <div className="space-y-2">
                {team.map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between border px-3 py-2 rounded">
                    {editingId === emp.id ? (
                      <div className="w-full flex justify-between items-center gap-2">
                        <div className="flex-1">
                          <input
                            value={editData.name || ""}
                            onChange={(e) => handleEditChange("name", e.target.value)}
                            className="border p-1 rounded w-full text-sm mb-1"
                          />
                          <input
                            type="number"
                            value={editData.salary || ""}
                            onChange={(e) => handleEditChange("salary", parseInt(e.target.value))}
                            className="border p-1 rounded w-full text-sm mb-1"
                          />
                          <input
                            value={editData.supervisor || ""}
                            onChange={(e) => handleEditChange("supervisor", e.target.value)}
                            className="border p-1 rounded w-full text-sm"
                          />
                        </div>
                        <div className="flex gap-1">
                          <button onClick={handleSave} className="text-green-600 hover:text-green-800">
                            <Check size={16} />
                          </button>
                          <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800">
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <p className="font-medium">{emp.name}</p>
                          <p className="text-sm text-gray-600">Salary: ₹{emp.salary.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Supervisor: {emp.supervisor}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={emp.status}
                            onChange={(e) =>
                              handleStatusChange(emp.id, e.target.value as "Pending" | "Done")
                            }
                            className={`p-1 rounded border text-xs ${
                              emp.status === "Done"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Done">Done</option>
                          </select>
                          <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:text-blue-800">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
