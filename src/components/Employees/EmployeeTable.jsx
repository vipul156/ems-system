"use client";
import React, { useState } from "react";
import { useEmployee } from "@/context/EmployeeContext";
import AddEmployeeModal from "./AddEmployeeModal";
import Image from "next/image";

export default function EmployeeTable() {
    const { employees, deleteEmployee } = useEmployee();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Team Members
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your workforce effectively</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-8 text-center font-medium text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/30"
                >
                    + Add Employee
                </button>
            </div>

            {employees.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 dark:bg-gray-700">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No employees yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Get started by adding your first team member.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {employees.map((employee) => (
                        <div
                            key={employee.id}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => deleteEmployee(employee.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px] mb-4">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-1">
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold rounded-full">
                                            {employee.name.charAt(0)}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{employee.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{employee.role}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Department</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{employee.department}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">ID</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 font-mono">{employee.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Salary</p>
                                    <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-1">${employee.salary.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">RFID</p>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mt-1">
                                        {employee.rfid}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <AddEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
