"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

const initialTasks = [
    {
        id: "TASK-001",
        title: "Design Homepage",
        description: "Create new design for the homepage using Tailwind.",
        assignedTo: "EMP001",
        status: "In Progress",
        priority: "High",
    },
    {
        id: "TASK-002",
        title: "Fix Login Bug",
        description: "Login fails when password contains special char.",
        assignedTo: "EMP002",
        status: "Open",
        priority: "High",
    },
    {
        id: "TASK-003",
        title: "Update Documentation",
        description: "Update the API docs.",
        assignedTo: "EMP001",
        status: "Completed",
        priority: "Low",
    },
];

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("tasks");
        if (stored) {
            setTasks(JSON.parse(stored));
        } else {
            setTasks(initialTasks);
            localStorage.setItem("tasks", JSON.stringify(initialTasks));
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: `TASK-${Date.now()}` }]);
    };

    const updateTaskStatus = (id, newStatus) => {
        setTasks(
            tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    }

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, updateTaskStatus, deleteTask }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
