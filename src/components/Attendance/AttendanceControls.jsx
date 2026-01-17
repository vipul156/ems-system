"use client";
import React, { useState, useEffect } from "react";
import { useEmployee } from "@/context/EmployeeContext";
import { useAttendance } from "@/context/AttendanceContext";
import Image from "next/image";

export default function AttendanceControls() {
    const { employees } = useEmployee();
    const { toggleCheckIn, attendanceRecords } = useAttendance();
    const [selectedEmpId, setSelectedEmpId] = useState("");
    const [scanStatus, setScanStatus] = useState(null); // 'scanning', 'success', 'error'
    const [feedbackMsg, setFeedbackMsg] = useState("");

    const selectedEmployee = employees.find(e => e.id === selectedEmpId);

    // Reset status after a few seconds
    useEffect(() => {
        if (scanStatus === 'success' || scanStatus === 'error') {
            const timer = setTimeout(() => {
                setScanStatus(null);
                setFeedbackMsg("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [scanStatus]);

    const handleScan = () => {
        if (!selectedEmpId) {
            setScanStatus('error');
            setFeedbackMsg("Please select an ID Card first");
            return;
        }

        setScanStatus('scanning');

        // Simulate reading delay
        setTimeout(() => {
            const alreadyCheckedIn = attendanceRecords.find(
                r => r.employeeId === selectedEmpId && r.date === new Date().toISOString().split('T')[0] && !r.checkOut
            );
            const action = alreadyCheckedIn ? "Checked Out" : "Checked In";

            toggleCheckIn(selectedEmpId);
            setScanStatus('success');
            setFeedbackMsg(`Successfully ${action}: ${selectedEmployee?.name}`);
            setSelectedEmpId(""); // Reset selection
        }, 1500);
    };

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800 relative overflow-hidden">
            {/* Ambient Background Effect */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white relative z-10">
                Quick Attendance
                <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Tap card to verify identity</span>
            </h3>

            <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Visual RFID Reader */}
                <div className="flex-1 w-full max-w-sm">
                    <div className={`relative group cursor-pointer transition-all duration-500 transform ${scanStatus === 'scanning' ? 'scale-95' : 'hover:scale-105'}`} onClick={handleScan}>
                        {/* Reader Pad */}
                        <div className={`
                            h-64 rounded-xl border-2 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300
                            ${scanStatus === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                                scanStatus === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                                    'border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/50'}
                        `}>
                            {/* Animated Waves */}
                            {scanStatus === 'scanning' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-full absolute bg-blue-400/20 rounded-xl animate-ping"></div>
                                    <div className="w-48 h-48 absolute bg-blue-400/20 rounded-xl animate-ping delay-100"></div>
                                </div>
                            )}

                            {/* Icon/Status */}
                            <div className="relative z-10">
                                {scanStatus === 'success' ? (
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 mx-auto">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                ) : (
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto transition-colors ${selectedEmpId ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'}`}>
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                )}

                                <h4 className={`text-lg font-semibold ${scanStatus === 'success' ? 'text-green-700' : 'text-gray-700 dark:text-gray-200'}`}>
                                    {scanStatus === 'scanning' ? "Reading Card..." :
                                        scanStatus === 'success' ? "Access Granted" :
                                            selectedEmpId ? "Ready to Scan" : "Place Card Here"}
                                </h4>
                                <p className="text-sm text-gray-500 mt-1 min-h-[20px]">{feedbackMsg}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Selector / Simulation Controls */}
                <div className="flex-1 w-full space-y-6">
                    <div className="bg-white dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-600">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Select Employee ID Card (Simulation)
                        </label>
                        <select
                            value={selectedEmpId}
                            onChange={(e) => setSelectedEmpId(e.target.value)}
                            disabled={scanStatus === 'scanning'}
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">-- Pick a Card --</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.name} — {emp.rfid}
                                </option>
                            ))}
                        </select>

                        {/* Selected Card Preview */}
                        {selectedEmployee && (
                            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg relative overflow-hidden transition-all animate-fade-in-up">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                                </div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-14 h-14 bg-white/20 rounded-full p-1 backdrop-blur-sm">
                                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl rounded-full">
                                            {selectedEmployee.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-blue-100 text-xs uppercase tracking-wider">Employee ID</p>
                                        <p className="font-bold text-lg">{selectedEmployee.name}</p>
                                        <p className="text-sm text-blue-100 font-mono">{selectedEmployee.rfid}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleScan}
                        disabled={!selectedEmpId || scanStatus === 'scanning'}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95
                            ${!selectedEmpId ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700' :
                                scanStatus === 'scanning' ? 'bg-blue-400 cursor-wait' :
                                    'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-blue-500/30'}
                        `}
                    >
                        {scanStatus === 'scanning' ? "Scanning..." : "Tap to Scan"}
                    </button>
                </div>
            </div>
        </div>
    );
}
