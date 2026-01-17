import React from "react";

import PayrollTable from "@/components/Payroll/PayrollTable";

export default function PayrollPage() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6">

            {/* Page Header */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                    Payroll Management
                </h2>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                {/* Card 1 */}
                <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition">
                    <p className="text-sm font-medium text-slate-500">TOTAL NET PAYROLL</p>
                    <h3 className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">$7,664</h3>
                    <p className="text-xs text-slate-500 mt-1">For current month</p>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition">
                    <p className="text-sm font-medium text-slate-500">TOTAL EMPLOYEES</p>
                    <h3 className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">2</h3>
                    <span className="text-green-500 text-sm mt-1 inline-block">● Active</span>
                </div>

                {/* Card 3 */}
                <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition">
                    <p className="text-sm font-medium text-slate-500">PAY DAY</p>
                    <h3 className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">28th</h3>
                    <p className="text-xs text-slate-500 mt-1">Upcoming payment</p>
                </div>
            </div>

            {/* Payroll Table */}
            <div className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-xl border border-white/40 p-6">
                <PayrollTable />
            </div>

        </div>
    );
}
