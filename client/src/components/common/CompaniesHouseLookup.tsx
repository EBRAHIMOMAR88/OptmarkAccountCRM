import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search, Building2, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Mock Companies House Data
interface CompanyProfile {
  company_name: string;
  company_number: string;
  company_status: string;
  date_of_creation: string;
  type: string;
  registered_office_address: {
    address_line_1: string;
    address_line_2?: string;
    locality: string;
    postal_code: string;
  };
  accounts: {
    next_accounts_due_on: string;
    next_made_up_to: string;
    overdue: boolean;
  };
  confirmation_statement: {
    next_due: string;
    overdue: boolean;
  };
}

const MOCK_COMPANIES: Record<string, CompanyProfile> = {
  "12345678": {
    company_name: "TECH SOLUTIONS LTD",
    company_number: "12345678",
    company_status: "active",
    date_of_creation: "2020-05-15",
    type: "ltd",
    registered_office_address: {
      address_line_1: "123 Innovation Drive",
      locality: "London",
      postal_code: "EC1A 1BB"
    },
    accounts: {
      next_accounts_due_on: "2026-05-31",
      next_made_up_to: "2025-08-31",
      overdue: false
    },
    confirmation_statement: {
      next_due: "2025-05-29",
      overdue: false
    }
  },
  "87654321": {
    company_name: "GREEN GARDENS CO",
    company_number: "87654321",
    company_status: "active",
    date_of_creation: "2018-11-20",
    type: "ltd",
    registered_office_address: {
      address_line_1: "The Barn",
      locality: "Leeds",
      postal_code: "LS1 1AB"
    },
    accounts: {
      next_accounts_due_on: "2025-08-31",
      next_made_up_to: "2024-11-30",
      overdue: false
    },
    confirmation_statement: {
      next_due: "2025-12-04",
      overdue: false
    }
  }
};

interface CompaniesHouseLookupProps {
  onCompanySelect: (company: CompanyProfile) => void;
}

export function CompaniesHouseLookup({ onCompanySelect }: CompaniesHouseLookupProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CompanyProfile | null>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!query) return;
    
    setIsLoading(true);
    setError("");
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would call the Companies House Public Data API
      // For demo, we use mock data or generate a generic response if searching by name
      
      let found: CompanyProfile | undefined = MOCK_COMPANIES[query];
      
      if (!found && query.length === 8) {
        // Not in mock but looks like a company number, generate generic
        found = {
          company_name: "DEMO COMPANY LTD",
          company_number: query,
          company_status: "active",
          date_of_creation: "2023-01-01",
          type: "ltd",
          registered_office_address: {
            address_line_1: "123 Demo Street",
            locality: "Manchester",
            postal_code: "M1 1AA"
          },
          accounts: {
            next_accounts_due_on: "2025-09-30",
            next_made_up_to: "2024-12-31",
            overdue: false
          },
          confirmation_statement: {
            next_due: "2025-01-14",
            overdue: false
          }
        };
      }

      if (found) {
        setResult(found);
      } else {
        setError("No company found with that number. Try '12345678' for demo.");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-slate-50/50 dark:bg-slate-900/20">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-6 rounded bg-[#005ebb] flex items-center justify-center text-white text-[10px] font-bold">
          CH
        </div>
        <Label className="text-sm font-medium text-foreground">
          Import from Companies House
        </Label>
      </div>
      
      <div className="flex gap-2">
        <Input 
          placeholder="Enter Company Number (e.g. 12345678)" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
          className="font-mono"
          maxLength={8}
        />
        <Button 
          type="button" 
          variant="outline"
          onClick={handleSearch}
          disabled={isLoading || !query}
          className="border-[#005ebb] text-[#005ebb] hover:bg-[#005ebb]/10"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span className="sr-only sm:not-sr-only sm:ml-2">Search</span>
        </Button>
      </div>

      {error && (
        <div className="text-xs text-red-500 flex items-center gap-1 animate-in fade-in">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}

      {result && (
        <Card className="animate-in fade-in slide-in-from-top-2 duration-300 border-l-4 border-l-[#005ebb]">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm">{result.company_name}</h4>
                <p className="text-xs text-muted-foreground font-mono">{result.company_number}</p>
              </div>
              <Badge variant={result.company_status === 'active' ? 'default' : 'secondary'} className="capitalize">
                {result.company_status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <span className="text-muted-foreground block">Registered Office</span>
                <span className="block text-foreground/90">
                  {result.registered_office_address.address_line_1}, {result.registered_office_address.locality}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground block">Next Accounts Due</span>
                <span className={result.accounts.overdue ? "text-red-600 font-bold" : "text-foreground/90"}>
                  {result.accounts.next_accounts_due_on}
                </span>
              </div>
            </div>

            <Button 
              size="sm" 
              className="w-full bg-[#005ebb] hover:bg-[#004d9a] text-white mt-2"
              onClick={() => onCompanySelect(result)}
              type="button"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-2" />
              Use Company Details
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
