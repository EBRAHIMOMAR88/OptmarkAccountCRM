import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Settings2, Filter } from "lucide-react";
import { mockServices, Service } from "@/lib/services";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ServiceCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>(mockServices);

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Service Catalog</h1>
            <p className="text-muted-foreground mt-1">
              Manage the services offered by your practice and their default configurations.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Define a new service offering for your clients.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input id="name" placeholder="e.g. Quarterly Management Accounts" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tax">Tax</SelectItem>
                      <SelectItem value="accounts">Accounts</SelectItem>
                      <SelectItem value="payroll">Payroll</SelectItem>
                      <SelectItem value="advisory">Advisory</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="frequency">Default Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one_off">One-off</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fee">Default Fee (£)</Label>
                  <Input id="fee" type="number" placeholder="0.00" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Service</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2 bg-card p-1 rounded-lg border border-border/40 shadow-sm max-w-md">
          <Search className="h-4 w-4 text-muted-foreground ml-2" />
          <Input 
            placeholder="Search services..." 
            className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card key={service.id} className="group hover:shadow-md transition-all duration-200 border-border/60">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="uppercase text-[10px] tracking-wider font-semibold mb-2">
                    {service.category}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border/40">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Frequency</span>
                    <span className="font-medium capitalize">{service.defaultFrequency.replace('_', ' ')}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-muted-foreground text-xs">Standard Fee</span>
                    <span className="font-medium">£{service.defaultFee}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
