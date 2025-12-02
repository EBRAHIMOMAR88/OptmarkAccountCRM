export interface TimeEntry {
  id: string;
  taskId: string;
  clientId: string;
  date: string;
  hours: number;
  description: string;
  staff: string;
  billable: boolean;
  rate?: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  number: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  lineItems: {
    description: string;
    hours: number;
    rate: number;
    amount: number;
  }[];
}

export const mockTimeEntries: TimeEntry[] = [
  {
    id: "1",
    taskId: "1",
    clientId: "1",
    date: "2025-10-15",
    hours: 2.5,
    description: "VAT Return preparation - review of sales invoices",
    staff: "JD",
    billable: true,
    rate: 150
  },
  {
    id: "2",
    taskId: "1",
    clientId: "1",
    date: "2025-10-16",
    hours: 1.5,
    description: "VAT Return - calculation and submission",
    staff: "JD",
    billable: true,
    rate: 150
  },
  {
    id: "3",
    taskId: "3",
    clientId: "2",
    date: "2025-10-20",
    hours: 3,
    description: "Year-end planning meeting",
    staff: "JD",
    billable: true,
    rate: 200
  },
  {
    id: "4",
    taskId: "2",
    clientId: "2",
    date: "2025-11-05",
    hours: 0.5,
    description: "Payroll submission - RTI filing",
    staff: "JD",
    billable: true,
    rate: 100
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    clientId: "1",
    number: "INV-001-2025",
    issueDate: "2025-10-20",
    dueDate: "2025-11-20",
    amount: 600,
    status: "sent",
    lineItems: [
      { description: "VAT Return Q3 2025", hours: 4, rate: 150, amount: 600 }
    ]
  },
  {
    id: "2",
    clientId: "2",
    number: "INV-002-2025",
    issueDate: "2025-10-25",
    dueDate: "2025-11-25",
    amount: 950,
    status: "paid",
    lineItems: [
      { description: "Year-end planning meeting", hours: 3, rate: 200, amount: 600 },
      { description: "October Payroll Services", hours: 1.4, rate: 250, amount: 350 }
    ]
  }
];
