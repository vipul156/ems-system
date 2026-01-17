"use client";
import React from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { EmployeeProvider } from "@/context/EmployeeContext";
import { AttendanceProvider } from "@/context/AttendanceContext";
import { TaskProvider } from "@/context/TaskContext";
import { AuthProvider } from "@/context/AuthContext";

const outfit = Outfit({
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} dark:bg-gray-900`}>
                <ThemeProvider>
                    <AuthProvider>
                        <SidebarProvider>
                            <EmployeeProvider>
                                <AttendanceProvider>
                                    <TaskProvider>
                                        {children}
                                    </TaskProvider>
                                </AttendanceProvider>
                            </EmployeeProvider>
                        </SidebarProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
