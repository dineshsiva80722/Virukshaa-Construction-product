export type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  supervisor: string;
  salary: string;
  joined: string;
  status: "Active" | "Inactive";
  skills: string[];
};
