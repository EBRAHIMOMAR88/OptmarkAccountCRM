import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
}

interface AddressLookupProps {
  onAddressSelect: (address: Address) => void;
  defaultPostcode?: string;
}

// Mock database of addresses for demo purposes
const MOCK_ADDRESSES: Record<string, Address[]> = {
  "SW1A 1AA": [
    { line1: "Buckingham Palace", line2: "Westminster", city: "London", postcode: "SW1A 1AA" },
    { line1: "The Queen's Gallery", line2: "Buckingham Palace Road", city: "London", postcode: "SW1A 1AA" },
  ],
  "M1 1AA": [
    { line1: "1 Piccadilly Gardens", line2: "", city: "Manchester", postcode: "M1 1AA" },
    { line1: "City Tower", line2: "Piccadilly Plaza", city: "Manchester", postcode: "M1 1AA" },
  ],
  "EC1A 1BB": [
    { line1: "100 Farringdon Road", line2: "", city: "London", postcode: "EC1A 1BB" },
    { line1: "The Clerk's House", line2: "Farringdon", city: "London", postcode: "EC1A 1BB" },
  ],
};

export function AddressLookup({ onAddressSelect, defaultPostcode = "" }: AddressLookupProps) {
  const [postcode, setPostcode] = useState(defaultPostcode);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Address[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!postcode) return;
    
    setIsLoading(true);
    setHasSearched(false);
    setResults([]);

    // Simulate API delay
    setTimeout(() => {
      const normalizedPostcode = postcode.toUpperCase().trim();
      // In a real app, this would call an API like getaddress.io or ideal-postcodes
      // For demo, we either return mock data or generic generated addresses if not found in mock
      const found = MOCK_ADDRESSES[normalizedPostcode] || [
        { line1: `1 ${normalizedPostcode} Street`, line2: "City Centre", city: "London", postcode: normalizedPostcode },
        { line1: `Flat 1, 5 ${normalizedPostcode} Road`, line2: "West End", city: "London", postcode: normalizedPostcode },
        { line1: `Unit 10, ${normalizedPostcode} Industrial Est`, line2: "", city: "London", postcode: normalizedPostcode },
      ];
      
      setResults(found);
      setHasSearched(true);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-muted/20">
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Quick Address Lookup
        </Label>
        <div className="flex gap-2">
          <Input 
            placeholder="Enter Postcode (e.g. SW1A 1AA)" 
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
            className="font-mono uppercase"
          />
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleSearch}
            disabled={isLoading || !postcode}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="sr-only sm:not-sr-only sm:ml-2">Find</span>
          </Button>
        </div>
      </div>

      {hasSearched && results.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
          <Select onValueChange={(idx) => onAddressSelect(results[parseInt(idx)])}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select an address..." />
            </SelectTrigger>
            <SelectContent>
              {results.map((addr, idx) => (
                <SelectItem key={idx} value={idx.toString()}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="truncate">
                      {addr.line1}, {addr.line2 ? `${addr.line2}, ` : ''}{addr.city}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[10px] text-muted-foreground mt-1 text-right">
            *Selecting will overwrite address fields below
          </p>
        </div>
      )}
    </div>
  );
}
