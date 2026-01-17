"use client";
import React from "react";
import { useAttendance } from "@/context/AttendanceContext";
import { useEmployee } from "@/context/EmployeeContext";

export default function AttendanceHistory() {
    const { attendanceRecords } = useAttendance();
    const { employees } = useEmployee();

    const getEmployeeName = (id) => {
        const emp = employees.find((e) => e.id === id);
        return emp ? emp.name : "Unknown ID";
    };

    const getEmployeeRFID = (id) => {
        const emp = employees.find((e) => e.id === id);
        return emp ? emp.rfid : "Unknown";
    };

    const getStatus = (checkInTime) => {
        if (!checkInTime) return { label: "Absent", color: "red" };
        const [hours, minutes] = checkInTime.split(':').map(Number);
        // Assuming 9:30 AM is the cutoff
        if (hours < 9 || (hours === 9 && minutes <= 30)) {
            return { label: "On Time", color: "green" };
        }
        return { label: "Late", color: "orange" };
    };

    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden mt-6">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    Attendance Log
                </h4>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-700/50">
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">RFID Tag</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check Out</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {attendanceRecords.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            attendanceRecords.map((record, index) => {
                                const status = getStatus(record.checkIn);
                                return (
                                    <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {record.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">
                                                    {getEmployeeName(record.employeeId).charAt(0)}
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">{getEmployeeName(record.employeeId)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs hidden sm:table-cell">
                                            {getEmployeeRFID(record.employeeId)}
                                        </td>
                                        <td className="px-6 py-4 text-green-600 dark:text-green-400 font-medium">
                                            {record.checkIn}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {record.checkOut || "--:--"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                ${status.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                                    status.color === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                {status.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
