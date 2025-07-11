"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import AddEmployee from "./AddEmployee";

function Header({ onAddEmployee }: { onAddEmployee: (employee: any) => void }) {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 mb-4 gap-3">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
          Employee Management
        </h1>
        <div className="flex justify-end">
          <Button
            className="bg-black text-white w-full sm:w-auto"
            onClick={() => setShowCard(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Modal for AddEmployee */}
      {showCard && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white rounded-xl p-6 shadow-lg">
            <button
              className="absolute top-3 right-3 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
              onClick={() => setShowCard(false)}
            >
              ✕
            </button>
            <AddEmployee
              onSave={(employee) => {
                onAddEmployee(employee);
                setShowCard(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
