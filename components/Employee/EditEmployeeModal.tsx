"use client";

import { useState } from "react";
import { Employee } from "./type";

type Props = {
  employee: Employee;
  onSave: (updated: Employee) => void;
  onCancel: () => void;
};

export default function EditEmployeeModal({ employee, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<Employee>(employee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" value={formData.name} onChange={handleChange} className="border w-full p-2 rounded" />
          <input name="email" value={formData.email} onChange={handleChange} className="border w-full p-2 rounded" />
          <input name="phone" value={formData.phone} onChange={handleChange} className="border w-full p-2 rounded" />
          <input name="role" value={formData.role} onChange={handleChange} className="border w-full p-2 rounded" />
          <input name="department" value={formData.department} onChange={handleChange} className="border w-full p-2 rounded" />
          <input name="supervisor" value={formData.supervisor} onChange={handleChange} className="border w-full p-2 rounded" />
          <input name="salary" value={formData.salary} onChange={handleChange} className="border w-full p-2 rounded" />
          <input name="joined" type="date" value={formData.joined} onChange={handleChange} className="border w-full p-2 rounded" />
          <select name="status" value={formData.status} onChange={handleChange} className="border w-full p-2 rounded">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" className="text-gray-600" onClick={onCancel}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
