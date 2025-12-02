import { z } from "zod";

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskType = 'tax_return' | 'payroll' | 'accounts' | 'onboarding' | 'ad hoc';

export interface Task {
  id: string;
  title: string;
  description?: string;
  clientId: string;
  clientName: string;
  serviceId?: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  dueDate: string;
  assignedTo?: string; // Staff ID
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Q3 VAT Return",
    description: "Prepare and submit VAT return for period ending Sep 30",
    clientId: "1",
    clientName: "Tech Solutions Ltd",
    serviceId: "vat-return",
    status: "in_progress",
    priority: "high",
    type: "tax_return",
    dueDate: "2025-11-07",
    assignedTo: "JD",
    createdAt: "2025-10-01",
    updatedAt: "2025-10-15",
    tags: ["vat", "quarterly"]
  },
  {
    id: "2",
    title: "October Payroll",
    description: "Process monthly payroll and RTI submission",
    clientId: "2",
    clientName: "Green Gardens Co",
    serviceId: "payroll-monthly",
    status: "todo",
    priority: "medium",
    type: "payroll",
    dueDate: "2025-11-05",
    assignedTo: "JD",
    createdAt: "2025-10-20",
    updatedAt: "2025-10-20",
    tags: ["payroll", "monthly"]
  },
  {
    id: "3",
    title: "Self Assessment 24/25",
    description: "Request information for personal tax return",
    clientId: "1",
    clientName: "John Doe",
    serviceId: "self-assessment",
    status: "blocked",
    priority: "low",
    type: "tax_return",
    dueDate: "2026-01-31",
    createdAt: "2025-09-01",
    updatedAt: "2025-10-01",
    tags: ["personal-tax", "waiting-info"]
  },
  {
    id: "4",
    title: "Onboarding Checks",
    description: "AML checks and engagement letter",
    clientId: "2",
    clientName: "Jane Smith",
    status: "completed",
    priority: "high",
    type: "onboarding",
    dueDate: "2025-10-10",
    assignedTo: "JD",
    createdAt: "2025-10-01",
    updatedAt: "2025-10-09",
    tags: ["compliance"]
  }
];

export const taskStatusColors: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700 border-slate-200",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  review: "bg-purple-100 text-purple-700 border-purple-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  blocked: "bg-red-100 text-red-700 border-red-200"
};

export const taskPriorityColors: Record<TaskPriority, string> = {
  low: "text-slate-500",
  medium: "text-blue-500",
  high: "text-amber-500",
  urgent: "text-red-500"
};
