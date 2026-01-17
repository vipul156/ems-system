"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Default to Admin for easier development/demo
    const [user, setUser] = useState({
        id: "ADMIN001",
        name: "Admin User",
        role: "admin", // 'admin' or 'employee'
        avatar: "/images/user/user-01.png",
    });

    // Simulated login/switch role function
    const loginAs = (role) => {
        if (role === 'admin') {
            setUser({
                id: "ADMIN001",
                name: "Admin User",
                role: "admin",
                avatar: "/images/user/user-01.png",
            });
        } else if (role === 'hr') {
            setUser({
                id: "HR001",
                name: "Human Resources",
                role: "hr",
                avatar: "/images/user/user-02.png",
            });
        } else {
            setUser({
                id: "EMP001",
                name: "John Doe",
                role: "employee",
                avatar: "/images/user/user-03.png",
            });
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginAs }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
