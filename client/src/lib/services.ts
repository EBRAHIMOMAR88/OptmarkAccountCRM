import { z } from "zod";

export type ServiceFrequency = 'one_off' | 'monthly' | 'quarterly' | 'annual';

export interface Service {
  id: string;
  name: string;
  description: string;
  defaultFrequency: ServiceFrequency;
  defaultFee?: number;
  category: 'tax' | 'accounts' | 'payroll' | 'advisory' | 'compliance';
}

export const mockServices: Service[] = [
  {
    id: "vat-return",
    name: "VAT Return",
    description: "Quarterly VAT return preparation and submission",
    defaultFrequency: "quarterly",
    defaultFee: 250,
    category: "tax"
  },
  {
    id: "payroll-monthly",
    name: "Monthly Payroll",
    description: "Monthly payslip generation and RTI submission",
    defaultFrequency: "monthly",
    defaultFee: 50,
    category: "payroll"
  },
  {
    id: "annual-accounts",
    name: "Annual Accounts",
    description: "Preparation of statutory year-end accounts",
    defaultFrequency: "annual",
    defaultFee: 1200,
    category: "accounts"
  },
  {
    id: "self-assessment",
    name: "Self Assessment Tax Return",
    description: "Individual personal tax return",
    defaultFrequency: "annual",
    defaultFee: 350,
    category: "tax"
  },
  {
    id: "bookkeeping",
    name: "Bookkeeping",
    description: "Monthly transaction reconciliation",
    defaultFrequency: "monthly",
    defaultFee: 200,
    category: "accounts"
  },
  {
    id: "comp-secretarial",
    name: "Company Secretarial",
    description: "Confirmation statement and registered office",
    defaultFrequency: "annual",
    defaultFee: 150,
    category: "compliance"
  }
];

export interface ClientService {
  id: string;
  clientId: string;
  serviceId: string;
  status: 'active' | 'paused' | 'completed';
  nextDeadline?: string;
  assignedTo?: string; // Staff ID
}

// Mock distribution of services
export const mockClientServices: ClientService[] = [
  { id: "1", clientId: "1", serviceId: "vat-return", status: "active", nextDeadline: "2025-05-07" },
  { id: "2", clientId: "1", serviceId: "annual-accounts", status: "active", nextDeadline: "2025-09-30" },
  { id: "3", clientId: "2", serviceId: "payroll-monthly", status: "active", nextDeadline: "2025-04-05" },
];
