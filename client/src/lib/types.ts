import { z } from "zod";

// Enums
export type EmploymentStatus = 'employed' | 'self_employed' | 'director' | 'pensioner' | 'multiple_income';
export type ClientStatus = 'active' | 'inactive' | 'left';

// Individual Client Schema
export const individualClientSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  
  // Address
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  
  // Tax Info
  nationalInsuranceNumber: z.string().regex(/^[A-Z]{2}[0-9]{6}[A-Z]{1}$/, "Invalid NI Number format (e.g. QQ123456C)"),
  hasUtr: z.boolean().default(false),
  utrNumber: z.string().length(10, "UTR must be 10 digits").optional().or(z.literal("")),
  
  // Employment
  employmentStatus: z.enum(['employed', 'self_employed', 'director', 'pensioner', 'multiple_income']),
  incomeSources: z.string().optional(),
  
  // Status
  clientStatus: z.enum(['active', 'inactive', 'left']).default('active'),
  specialNotes: z.string().optional(),
  
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type IndividualClient = z.infer<typeof individualClientSchema>;


// Business Client Schema
export const businessClientSchema = z.object({
  id: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  companyNumber: z.string().length(8, "Company number must be 8 characters"),
  utrNumber: z.string().length(10, "UTR must be 10 digits"),
  
  // Tax Registration
  vatNumber: z.string().length(9, "VAT number must be 9 digits").optional().or(z.literal("")),
  payeReference: z.string().optional(),
  
  // Responsible Person
  responsiblePersonName: z.string().min(1, "Responsible person name is required"),
  responsiblePersonEmail: z.string().email("Invalid email address"),
  responsiblePersonPhone: z.string().min(1, "Responsible person phone is required"),
  
  // Registered Address
  registeredAddressLine1: z.string().min(1, "Address line 1 is required"),
  registeredAddressLine2: z.string().optional(),
  registeredCity: z.string().min(1, "City is required"),
  registeredPostcode: z.string().min(1, "Postcode is required"),
  
  // Trading Address
  tradingAddressSame: z.boolean().default(true),
  tradingAddressLine1: z.string().optional(),
  tradingAddressLine2: z.string().optional(),
  tradingCity: z.string().optional(),
  tradingPostcode: z.string().optional(),
  
  // Status
  clientStatus: z.enum(['active', 'inactive', 'left']).default('active'),
  specialNotes: z.string().optional(),
  
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type BusinessClient = z.infer<typeof businessClientSchema>;
