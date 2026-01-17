import type { Metadata } from "next";
import React from "react";
import TaskKanban from "@/components/Tasks/TaskKanban";

export const metadata: Metadata = {
  title: "Dashboard | Employee Management System",
  description: "Employee Management System Dashboard",
};

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Future: Add Summary Cards here */}
      <TaskKanban />
    </div>
  );
}
