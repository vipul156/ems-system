"use client";
import React, { useState } from "react";
import { useEmployee } from "@/context/EmployeeContext";

export default function AddEmployeeModal({ isOpen, onClose }) {
    const { addEmployee } = useEmployee();
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        role: "",
        salary: "",
        rfid: "",
        email: "",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee({ ...formData, salary: Number(formData.salary) });
        setFormData({
            name: "",
            department: "",
            role: "",
            salary: "",
            rfid: "",
            email: "",
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-8">
                <h3 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Add New Employee
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/2">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Department
                            </label>
                            <input
                                type="text"
                                name="department"
                                required
                                placeholder="Department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Role
                            </label>
                            <input
                                type="text"
                                name="role"
                                required
                                placeholder="Role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/2">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Salary
                            </label>
                            <input
                                type="number"
                                name="salary"
                                required
                                placeholder="Monthly Salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                RFID/NFC ID
                            </label>
                            <input
                                type="text"
                                name="rfid"
                                required
                                placeholder="NFC Tag ID"
                                value={formData.rfid}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
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
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
