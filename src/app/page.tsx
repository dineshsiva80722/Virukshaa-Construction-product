import Sidebar from "@/components/Sidebar";
import Employee  from "@/components/Employee/Employee";


export default function Page() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Employee />
      </main>
    </div>
  )
}
