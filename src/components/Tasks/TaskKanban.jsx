"use client";
import React, { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { useEmployee } from "@/context/EmployeeContext";
import { useAuth } from "@/context/AuthContext";
import AddTaskModal from "./AddTaskModal";

export default function TaskKanban() {
    const { tasks, updateTaskStatus, deleteTask } = useTasks();
    const { employees } = useEmployee();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter tasks: Admin/HR sees all, Employee sees only assigned
    const displayedTasks = user.role === 'employee'
        ? tasks.filter(t => t.assignedTo === user.id)
        : tasks;

    const getEmployeeName = (id) => {
        const emp = employees.find((e) => e.id === id);
        return emp ? emp.name : "Unassigned";
    };

    const columns = [
        { title: "Open", color: "from-gray-500 to-gray-600", status: "Open" },
        { title: "In Progress", color: "from-blue-500 to-blue-600", status: "In Progress" },
        { title: "Completed", color: "from-green-500 to-green-600", status: "Completed" }
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {user.role === 'employee' ? 'My Tasks' : 'Project Board'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {user.role === 'employee'
                            ? 'Track your assigned responsibilities'
                            : 'Manage and assign team tasks'}
                    </p>
                </div>

                {/* Only Admin/HR can add tasks */}
                {user.role !== 'employee' && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 px-6 text-center font-medium text-white hover:opacity-90 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
                    >
                        + Create Task
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {columns.map((col) => (
                    <div key={col.status} className="flex flex-col h-full rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Column Header */}
                        <div className={`p-4 bg-gradient-to-r ${col.color} text-white`}>
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">{col.title}</h3>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-medium backdrop-blur-sm">
                                    {displayedTasks.filter(t => t.status === col.status).length}
                                </span>
                            </div>
                        </div>

                        {/* Task List */}
                        <div className="flex-1 p-4 space-y-4 min-h-[500px]">
                            {displayedTasks.filter(t => t.status === col.status).map((task) => {
                                const empName = getEmployeeName(task.assignedTo);
                                return (
                                    <div key={task.id} className="group bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full 
                                                ${task.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                                    task.priority === 'Medium' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                                                        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                {task.priority || 'Medium'} Priority
                                            </span>

                                            {/* Delete Action (Admin/HR only) */}
                                            {user.role !== 'employee' && (
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            )}
                                        </div>

                                        <h4 className="text-gray-900 dark:text-white font-bold mb-2 leading-tight">{task.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{task.description}</p>

                                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-gray-800">
                                                    {empName.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-400">Assignee</span>
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[80px]">{empName}</span>
                                                </div>
                                            </div>

                                            {/* Status Mover */}
                                            <select
                                                value={task.status}
                                                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                                className="text-xs bg-gray-50 dark:bg-gray-700 border-none rounded-lg py-1.5 pl-2 pr-6 text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            >
                                                {columns.map(c => <option key={c.status} value={c.status}>{c.status}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                );
                            })}

                            {displayedTasks.filter(t => t.status === col.status).length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50 py-12">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                    </div>
                                    <p className="text-sm font-medium">No tasks yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
