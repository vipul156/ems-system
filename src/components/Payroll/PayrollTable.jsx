"use client";
import React from "react";
import { useEmployee } from "@/context/EmployeeContext";
import { useAttendance } from "@/context/AttendanceContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PayrollTable() {
    const { employees } = useEmployee();
    const { attendanceRecords } = useAttendance();

    const calculatePayroll = (employee) => {
        const employeeRecords = attendanceRecords.filter(
            (r) => r.employeeId === employee.id
        );

        // 1. Calculate Presence
        const uniqueDays = new Set(employeeRecords.map((r) => r.date)).size;
        const daysPresent = uniqueDays || 22; // Default 22 working days for demo if no data
        const payPerDay = employee.salary / 30; // Assuming 30-day month basis
        const grossSalary = Math.round(payPerDay * daysPresent);

        // 2. Calculate Deductions
        let lateDays = 0;
        employeeRecords.forEach(record => {
            if (record.checkIn) {
                const [hours, minutes] = record.checkIn.split(':').map(Number);
                if (hours > 9 || (hours === 9 && minutes > 30)) {
                    lateDays++;
                }
            }
        });

        const latePenalty = lateDays * 15; // $15 per late arrival
        const tax = Math.round(grossSalary * 0.05); // 5% simulated tax
        const totalDeductions = latePenalty + tax;

        const netSalary = grossSalary - totalDeductions;

        return {
            daysPresent,
            grossSalary,
            deductions: totalDeductions,
            netSalary,
            lateDays,
            latePenalty,
            tax
        };
    };

    const handleDownloadSlip = (employee, payroll) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Payslip", 105, 15, { align: "center" });
        doc.setFontSize(12);
        doc.text(`Employee ID: ${employee.id}`, 14, 30);
        doc.text(`Name: ${employee.name}`, 14, 40);
        doc.text(`Department: ${employee.department}`, 14, 50);
        doc.text(`Role: ${employee.role}`, 14, 60);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 30);

        autoTable(doc, {
            startY: 70,
            head: [["Description", "Amount"]],
            body: [
                ["Basic Salary (Monthly Ref)", `$${employee.salary}`],
                ["Days Present", `${payroll.daysPresent}`],
                ["Gross Earnings", `$${payroll.grossSalary}`],
                ["Late Penalty", `-$${payroll.latePenalty} (${payroll.lateDays} days)`],
                ["Tax (5%)", `-$${payroll.tax}`],
                ["Total Deductions", `-$${payroll.deductions}`],
                [{ content: "Net Pay", styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }, { content: `$${payroll.netSalary}`, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }],
            ],
            theme: 'grid',
            headStyles: { fillColor: [66, 133, 244] },
        });

        doc.text("Authorized Signatory", 14, doc.lastAutoTable.finalY + 30);
        doc.save(`payslip_${employee.name}.pdf`);
    };

    // Calculate Totals for Dashboard
    const totalPayroll = employees.reduce((acc, emp) => acc + calculatePayroll(emp).netSalary, 0);
    const totalEmployees = employees.length;

    return (
        <div className="space-y-6">
            {/* Dashboard Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
                    <h3 className="text-blue-100 text-sm font-medium uppercase tracking-wider">Total Net Payroll</h3>
                    <p className="text-3xl font-bold mt-2">${totalPayroll.toLocaleString()}</p>
                    <p className="text-blue-100 text-sm mt-1">For current month</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Total Employees</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalEmployees}</p>
                    <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Pay Day</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">28th</p>
                    <p className="text-gray-400 text-sm mt-1">Upcoming payment</p>
                </div>
            </div>

            {/* Payroll Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payroll Details</h2>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Export Report
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-700/50">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Days Present</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deductions</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Net Payable</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {employees.map((employee) => {
                                const payroll = calculatePayroll(employee);
                                return (
                                    <tr key={employee.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-sm">
                                                    {employee.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{employee.name}</p>
                                                    <p className="text-xs text-gray-500">{employee.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                {payroll.daysPresent} Days
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            ${payroll.grossSalary.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-red-500 font-medium">
                                                -${payroll.deductions.toLocaleString()}
                                            </span>
                                            {payroll.lateDays > 0 && (
                                                <p className="text-xs text-red-400">({payroll.lateDays} Late)</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="font-bold text-gray-900 dark:text-white">${payroll.netSalary.toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDownloadSlip(employee, payroll)}
                                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm flex items-center justify-end gap-1 ml-auto"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Slip
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
