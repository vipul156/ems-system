import React from "react";

import EmployeeTable from "@/components/Employees/EmployeeTable";

export default function EmployeesPage() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6">

            {/* Page Header */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                    Employment Management
                </h2>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                {/* Total Employees */}
                <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition">
                    <p className="text-sm font-medium text-slate-500">TOTAL EMPLOYEES</p>
                    <h3 className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">42</h3>
                    <p className="text-xs text-slate-500 mt-1">Active workforce</p>
                </div>

                {/* Departments */}
                <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition">
                    <p className="text-sm font-medium text-slate-500">DEPARTMENTS</p>
                    <h3 className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">7</h3>
                    <p className="text-xs text-slate-500 mt-1">Across all teams</p>
                </div>

                {/* Attendance Rate */}
                <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition">
                    <p className="text-sm font-medium text-slate-500">ATTENDANCE RATE</p>
                    <h3 className="text-4xl font-bold mt-2 text-green-500">92%</h3>
                    <p className="text-xs text-slate-500 mt-1">This month</p>
                </div>
            </div>

            {/* Employees Table */}
            <div className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-xl border border-white/40 p-6">
                <EmployeeTable />
            </div>
        </div>
    );
}
