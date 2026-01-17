"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const EmployeeContext = createContext();

const initialEmployees = [
    {
        id: "EMP001",
        name: "John Doe",
        department: "Engineering",
        role: "Frontend Developer",
        salary: 5000,
        rfid: "NFC-101",
        email: "john@example.com",
        avatar: "/images/user/user-01.png", // Assuming path exists in template
    },
    {
        id: "EMP002",
        name: "Jane Smith",
        department: "HR",
        role: "HR Manager",
        salary: 6000,
        rfid: "NFC-102",
        email: "jane@example.com",
        avatar: "/images/user/user-02.png",
    },
];

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("employees");
        if (stored) {
            setEmployees(JSON.parse(stored));
        } else {
            setEmployees(initialEmployees);
            localStorage.setItem("employees", JSON.stringify(initialEmployees));
        }
    }, []);

    useEffect(() => {
        if (employees.length > 0) {
            localStorage.setItem("employees", JSON.stringify(employees));
        }
    }, [employees]);

    const addEmployee = (employee) => {
        setEmployees([...employees, { ...employee, id: `EMP${Date.now()}` }]);
    };

    const updateEmployee = (id, updatedData) => {
        setEmployees(
            employees.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
        );
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter((emp) => emp.id !== id));
    };

    return (
        <EmployeeContext.Provider
            value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployee = () => useContext(EmployeeContext);
