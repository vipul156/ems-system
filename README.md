# Employee Management System (EMS)

A comprehensive Employee Management System built with **Next.js** and **TailAdmin** (Tailwind CSS Admin Template). This application demonstrates core HR functionalities including Employee Management, Attendance Tracking, Payroll processing, and Task Assignment.

## Features

### 1. Employee Management
- **List View**: View all employees with key details (ID, Name, Role, Dept, Salary).
- **Add Employee**: Modal form to add new employees.
- **Delete**: Remove employees from the system.
- **Simulated Backend**: Data is persisted using `localStorage`.

### 2. Attendance System
- **NFC/RFID Simulation**: Simulate attendance check-ins using a dropdown selection (representing NFC tag scan).
- **Attendance History**: View logs of check-in and check-out times.
- **Status Tracking**: Automatically tracks "Present" status relative to check-ins.

### 3. Payroll Management
- **Automated Calculation**: Calculates gross salary based on simulated "days present" relative to a standard 30-day month.
- **Payslip Generation**: Generate and download professional PDF payslips using `jspdf`.
- **Summary Dashboard**: View calculated Net Pay for all employees.

### 4. Task Allotment (Ticketing)
- **Kanban Board**: Visual board for tasks (Open, In Progress, Completed).
- **Task Assignment**: Assign tasks to specific employees with priorities.
- **Manage Tasks**: Update status or delete tasks directly from the board.

## Tech Stack
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS (TailAdmin Template)
- **State Management**: React Context API
- **Persistence**: LocalStorage (Demo mode)
- **PDF Generation**: `jspdf`, `jspdf-autotable`

## Setup & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure
- `src/app`: Next.js App Router pages (employees, attendance, payroll, tasks).
- `src/components`: UI Components (EmployeeTable, TaskKanban, etc.).
- `src/context`: React Contexts (EmployeeContext, AttendanceContext, TaskContext).
- `src/layout`: Sidebar and Header configuration.

## Future Improvements
- Integrate real backend (Node.js/Firebase).
- Add authentication/login for specific roles.
- Advanced payroll deductions and tax calculations.
