"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import AddEmployee from "./AddEmployee";

function Header({ onAddEmployee }: { onAddEmployee: (employee: any) => void }) {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mt-4 mb-4">
        <h1 className="text-4xl font-bold">Employee Management</h1>
        <div className="flex gap-2">
          <Button
            className="bg-black text-white"
            onClick={() => setShowCard(!showCard)}
          >
            <UserPlus className="h-4 w-4 mr-2 " /> Add Employee
          </Button>

          {showCard && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white rounded-xl p-6">
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
      </div>
    </div>
  );
}

export default Header;
