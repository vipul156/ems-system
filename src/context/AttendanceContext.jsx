"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("attendance");
        if (stored) {
            setAttendanceRecords(JSON.parse(stored));
        }
        const status = localStorage.getItem("isCheckedIn");
        if (status === "true") setIsCheckedIn(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("attendance", JSON.stringify(attendanceRecords));
    }, [attendanceRecords]);

    useEffect(() => {
        localStorage.setItem("isCheckedIn", isCheckedIn.toString());
    }, [isCheckedIn]);

    const toggleCheckIn = (employeeId) => {
        const now = new Date();
        if (!isCheckedIn) {
            // Check In
            const record = {
                id: Date.now().toString(),
                employeeId,
                date: now.toLocaleDateString(),
                checkIn: now.toLocaleTimeString(),
                checkOut: null,
                status: "Present",
            };
            setAttendanceRecords([record, ...attendanceRecords]);
            setIsCheckedIn(true);
        } else {
            // Check Out
            const latestRecord = attendanceRecords[0]; // Assuming newest is first
            if (latestRecord && !latestRecord.checkOut) {
                const updated = { ...latestRecord, checkOut: now.toLocaleTimeString() };
                setAttendanceRecords([updated, ...attendanceRecords.slice(1)]);
                setIsCheckedIn(false);
            }
        }
    };

    return (
        <AttendanceContext.Provider
            value={{ attendanceRecords, isCheckedIn, toggleCheckIn }}
        >
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => useContext(AttendanceContext);
