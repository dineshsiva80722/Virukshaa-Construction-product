"use client";

import { useState } from "react";
import { User, Mail, Phone, Briefcase, Calendar, DollarSign, MapPin, Save, X, IndianRupee } from "lucide-react";

export default function AddEmployee({ onSave, onCancel }: { 
  onSave: (data: any) => void;
  onCancel?: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    department: "",
    supervisor: "",
    workType: "day work",
    startDate: "",
    endDate: "",
    salary: "",
    status: "Active",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    // Mobile validation
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const inputClasses = (fieldName: string) => `
    w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
    ${errors[fieldName] 
      ? 'border-red-300 bg-red-50' 
      : 'border-gray-300 hover:border-gray-400 focus:bg-white'
    }
  `;

  const selectClasses = (fieldName: string) => `
    w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
    ${errors[fieldName] 
      ? 'border-red-300 bg-red-50' 
      : 'border-gray-300 hover:border-gray-400 focus:bg-white'
    }
  `;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Add New Employee</h2>
            <p className="text-sm text-gray-600">Fill in the employee details below</p>
          </div>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-50 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="name"
                  placeholder="Enter employee's full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses('name')}
                  required
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  placeholder="employee@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses('email')}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="mobile"
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={inputClasses('mobile')}
                  required
                />
              </div>
              {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  name="address"
                  placeholder="Enter complete address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none hover:border-gray-400 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Work Information Section */}
        <div className="bg-gray-50 rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            Work Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={selectClasses('role')}
                  required
                >
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
              </div>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={selectClasses('department')}
                >
                  <option value="">Select Department</option>
                  <option value="Construction">Construction</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Operations">Operations</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Masonry">Masonry</option>
                  <option value="Painting">Painting</option>
                  <option value="Welding">Welding</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Safety">Safety</option>
                  <option value="Administration">Administration</option>
                  <option value="Quality Control">Quality Control</option>
                </select>
              </div>
              {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
            </div>
            {/* Supervisor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="supervisor"
                  placeholder="Enter supervisor name"
                  value={formData.supervisor}
                  onChange={handleChange}
                  className={inputClasses('supervisor')}
                />
              </div>
              {errors.supervisor && <p className="mt-1 text-sm text-red-600">{errors.supervisor}</p>}
            </div>

            {/* Work Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  className={selectClasses('workType')}
                >
                  <option value="day work">Day Work</option>
                  <option value="monthly">Monthly</option>
                  <option value="until end">Until End</option>
                </select>
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={inputClasses('startDate')}
                  required
                />
              </div>
              {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={inputClasses('endDate')}
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary ({formData.workType === 'day work' ? 'per day' : 'per month'})
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="salary"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.salary}
                  onChange={handleChange}
                  className={inputClasses('salary')}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={selectClasses('status')}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
}