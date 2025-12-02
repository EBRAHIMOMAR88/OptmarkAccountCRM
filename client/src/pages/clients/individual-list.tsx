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
import { Search, Plus, MoreHorizontal, Mail, Phone } from "lucide-react";
import { mockIndividualClients } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function IndividualClientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClients = mockIndividualClients.filter(client => 
    client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Individual Clients</h1>
            <p className="text-muted-foreground mt-1">
              Manage your individual tax clients and self-assessment records.
            </p>
          </div>
          <Link href="/individual-clients/new">
            <Button className="w-full sm:w-auto gap-2 shadow-md">
              <Plus className="h-4 w-4" />
              Add New Client
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 bg-card p-1 rounded-lg border border-border/40 shadow-sm max-w-md">
          <Search className="h-4 w-4 text-muted-foreground ml-2" />
          <Input 
            placeholder="Search by name or email..." 
            className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>NI Number</TableHead>
                <TableHead>Employment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No clients found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.id} className="group cursor-pointer hover:bg-muted/30">
                    <TableCell className="font-medium">
                      <a href={`/individual-clients/${client.id}`} className="group-hover:text-primary transition-colors">
                        {client.firstName} {client.lastName}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{client.nationalInsuranceNumber}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize bg-background">
                        {client.employmentStatus.replace('_', ' ')}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(client.id!)}>
                            Copy ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <Link href={`/individual-clients/${client.id}`}>
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
