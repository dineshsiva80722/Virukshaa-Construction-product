"use client";

import { useState } from "react";

export default function AddEmployee({ onSave }: { onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    workType: "day work",
    startDate: "",
    endDate: "",
    salary: "",
    status: "Active",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Call the parent handler
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name of the employee" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="email" placeholder="Mail" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="mobile" placeholder="Mobile number" value={formData.mobile} onChange={handleChange} className="w-full border p-2 rounded" required />
        <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Select Role</option>
          <option value="Labor">Labor</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Mason">Mason</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Painter">Painter</option>
          <option value="Welder">Welder</option>
          <option value="Site Engineer">Site Engineer</option>
          <option value="Safety Officer">Safety Officer</option>
        </select>
        <select name="workType" value={formData.workType} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="day work">Day work</option>
          <option value="monthly">Monthly</option>
          <option value="until end">Until end</option>
        </select>
        <div className="flex gap-4">
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <input name="salary" placeholder="Salary per day/month" value={formData.salary} onChange={handleChange} className="w-full border p-2 rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">Save Employee</button>
      </form>
    </div>
  );
}
