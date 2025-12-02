import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, Mail, Building } from "lucide-react";
import { mockBusinessClients } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BusinessClientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClients = mockBusinessClients.filter(client => 
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.companyNumber.includes(searchTerm) ||
    client.responsiblePersonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Business Clients</h1>
            <p className="text-muted-foreground mt-1">
              Manage your corporate clients, VAT, and payroll services.
            </p>
          </div>
          <Link href="/business-clients/new">
            <Button className="w-full sm:w-auto gap-2 shadow-md">
              <Plus className="h-4 w-4" />
              Add New Business
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 bg-card p-1 rounded-lg border border-border/40 shadow-sm max-w-md">
          <Search className="h-4 w-4 text-muted-foreground ml-2" />
          <Input 
            placeholder="Search by company name or number..." 
            className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px]">Company Details</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Responsible Person</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No business clients found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.id} className="group cursor-pointer hover:bg-muted/30">
                    <TableCell className="font-medium">
                      <Link href={`/business-clients/${client.id}`}>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <Building className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="group-hover:text-primary transition-colors">
                              {client.companyName}
                            </span>
                            <span className="text-xs text-muted-foreground font-normal">
                              {client.registeredCity}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-xs font-mono">
                        <span className="text-muted-foreground">No: {client.companyNumber}</span>
                        <span>UTR: {client.utrNumber}</span>
                        {client.vatNumber && <span>VAT: {client.vatNumber}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <span>{client.responsiblePersonName}</span>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                          <Mail className="h-3 w-3" />
                          {client.responsiblePersonEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          client.clientStatus === 'active' ? 'default' : 
                          client.clientStatus === 'inactive' ? 'secondary' : 'destructive'
                        }
                        className={
                          client.clientStatus === 'active' ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200' : ''
                        }
                      >
                        {client.clientStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(client.companyNumber)}>
                            Copy Company No.
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <Link href={`/business-clients/${client.id}`}>
                            <DropdownMenuItem>Edit details</DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem className="text-red-600">Archive client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
