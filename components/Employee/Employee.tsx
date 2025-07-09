"use client";

import React, { useState } from "react";
import Header from "./Header";
import EmployeeList from "./EmployeeList";
import Payroll from "./Payroll";
import type { Employee } from "./type";

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@site.com",
    phone: "1234567890",
    role: "Mason",
    department: "Construction",
    supervisor: "Mike",
    salary: "45000",
    joined: "2023-06-15",
    status: "Active",
    skills: ["Bricklaying", "Plastering"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@build.com",
    phone: "9876543210",
    role: "Electrician",
    department: "Electrical",
    supervisor: "Alice",
    salary: "47000",
    joined: "2023-01-10",
    status: "Inactive",
    skills: ["Wiring", "Maintenance"],
  },
  {
    id: 3,
    name: "Ravi Kumar",
    email: "ravi@construct.in",
    phone: "9988776655",
    role: "Plumber",
    department: "Plumbing",
    supervisor: "Suresh",
    salary: "42000",
    joined: "2022-11-01",
    status: "Active",
    skills: ["Pipe fitting", "Leak repair"],
  },
  {
    id: 4,
    name: "Meena Raj",
    email: "meena@ops.com",
    phone: "9012345678",
    role: "Supervisor",
    department: "Operations",
    supervisor: "N/A",
    salary: "55000",
    joined: "2023-03-20",
    status: "Active",
    skills: ["Team management", "Site coordination"],
  },
  {
    id: 5,
    name: "David Paul",
    email: "david@electric.in",
    phone: "8888777766",
    role: "Electrician",
    department: "Electrical",
    supervisor: "Alice",
    salary: "46000",
    joined: "2022-09-05",
    status: "Inactive",
    skills: ["Panel installation", "Troubleshooting"],
  },
  {
    id: 6,
    name: "Kavya Nair",
    email: "kavya@designs.com",
    phone: "9090909090",
    role: "Site Engineer",
    department: "Construction",
    supervisor: "Mike",
    salary: "60000",
    joined: "2024-02-12",
    status: "Active",
    skills: ["Planning", "Blueprint analysis"],
  },
];

function Employee() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const addEmployee = (newEmployee: Omit<Employee, "id">) => {
    const withId: Employee = { ...newEmployee, id: Date.now() };
    setEmployees((prev) => [...prev, withId]);
  };

  const updateEmployee = (updated: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updated.id ? updated : emp))
    );
  };

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div>
      <Header onAddEmployee={addEmployee} />
      <EmployeeList
        employees={employees}
        onUpdate={updateEmployee}
        onDelete={deleteEmployee}
      />
      <Payroll />
    </div>
  );
}

export default Employee;
