"use client";
import React, { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { useEmployee } from "@/context/EmployeeContext";

export default function AddTaskModal({ isOpen, onClose }) {
    const { addTask } = useTasks();
    const { employees } = useEmployee();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        status: "Open",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(formData);
        setFormData({
            title: "",
            description: "",
            assignedTo: "",
            priority: "Medium",
            status: "Open",
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-8">
                <h3 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Create New Task
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Task Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Enter task title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Description
                        </label>
                        <textarea
                            name="description"
                            required
                            placeholder="Task details"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Assign To
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select
                                name="assignedTo"
                                required
                                value={formData.assignedTo}
                                onChange={handleChange}
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                <option value="">Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.name} ({emp.role})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Priority
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
