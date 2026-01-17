import React from "react";

import AttendanceControls from "@/components/Attendance/AttendanceControls";
import AttendanceHistory from "@/components/Attendance/AttendanceHistory";

export default function AttendancePage() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6">

            {/* Page Header */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                    Attendance System
                </h2>

                {/* Button for Mark Attendance */}
                <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                    Mark Attendance
                </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                {/* Today Attendance */}
                <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition">
                    <p className="text-sm font-medium text-slate-500">TODAY PRESENT</p>
                    <h3 className="text-4xl font-bold mt-2 text-green-600">38</h3>
                    <p className="text-xs text-slate-500 mt-1">Out of 42 employees</p>
                </div>

                {/* Late Arrivals */}
                <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition">
                    <p className="text-sm font-medium text-slate-500">LATE ARRIVALS</p>
                    <h3 className="text-4xl font-bold mt-2 text-yellow-500">4</h3>
                    <p className="text-xs text-slate-500 mt-1">Marked late today</p>
                </div>

                {/* Absent */}
                <div className="rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition">
                    <p className="text-sm font-medium text-slate-500">ABSENT</p>
                    <h3 className="text-4xl font-bold mt-2 text-red-500">3</h3>
                    <p className="text-xs text-slate-500 mt-1">Not reported today</p>
                </div>
            </div>

            {/* Controls Panel */}
            <div className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-xl border border-white/40 p-6">
                <AttendanceControls />
            </div>

            {/* History Panel */}
            <div className="mt-10 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-xl border border-white/40 p-6">
                <AttendanceHistory />
            </div>

        </div>
    );
}
