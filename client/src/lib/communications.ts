export type CommunicationType = 'email' | 'call' | 'meeting' | 'document';
export type DocumentType = 'invoice' | 'tax_return' | 'accounts' | 'correspondence' | 'other';

export interface Communication {
  id: string;
  clientId: string;
  type: CommunicationType;
  subject: string;
  description?: string;
  date: string;
  createdBy: string;
  status: 'pending' | 'completed' | 'follow_up_needed';
}

export interface Document {
  id: string;
  clientId: string;
  fileName: string;
  documentType: DocumentType;
  uploadedDate: string;
  uploadedBy: string;
  fileSize: string;
  tags?: string[];
}

export const mockCommunications: Communication[] = [
  {
    id: "1",
    clientId: "1",
    type: "email",
    subject: "Q3 VAT Return - Information Requested",
    description: "Sent request for Q3 sales and purchase invoices",
    date: "2025-10-15",
    createdBy: "JD",
    status: "completed"
  },
  {
    id: "2",
    clientId: "1",
    type: "call",
    subject: "Follow-up on VAT Query",
    description: "Discussed handling of import duties on Q3 supplies",
    date: "2025-10-10",
    createdBy: "JD",
    status: "completed"
  },
  {
    id: "3",
    clientId: "2",
    type: "meeting",
    subject: "Year-end Planning Meeting",
    description: "Reviewed company performance, discussed tax planning opportunities",
    date: "2025-09-28",
    createdBy: "JD",
    status: "completed"
  },
  {
    id: "4",
    clientId: "2",
    type: "email",
    subject: "October Payroll Submission",
    description: "Submitted RTI return for October payroll",
    date: "2025-11-05",
    createdBy: "JD",
    status: "completed"
  }
];

export const mockDocuments: Document[] = [
  {
    id: "1",
    clientId: "1",
    fileName: "Q3_2025_Sales_Invoices.pdf",
    documentType: "correspondence",
    uploadedDate: "2025-10-16",
    uploadedBy: "Client",
    fileSize: "2.4 MB",
    tags: ["vat", "invoices"]
  },
  {
    id: "2",
    clientId: "1",
    fileName: "VAT_Return_Q3_2025.pdf",
    documentType: "tax_return",
    uploadedDate: "2025-10-20",
    uploadedBy: "JD",
    fileSize: "1.1 MB",
    tags: ["vat", "filed"]
  },
  {
    id: "3",
    clientId: "2",
    fileName: "Accounts_2024_Submitted.pdf",
    documentType: "accounts",
    uploadedDate: "2025-09-15",
    uploadedBy: "JD",
    fileSize: "3.2 MB",
    tags: ["annual-accounts"]
  },
  {
    id: "4",
    clientId: "2",
    fileName: "Invoice_GG001_Oct2025.pdf",
    documentType: "invoice",
    uploadedDate: "2025-11-01",
    uploadedBy: "Client",
    fileSize: "0.8 MB",
    tags: ["payroll"]
  }
];
