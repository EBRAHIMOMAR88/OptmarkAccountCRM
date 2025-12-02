import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Eye, Download, Send } from "lucide-react";
import { mockInvoices } from "@/lib/timetracking";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export default function Invoices() {
  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = mockInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const outstandingAmount = totalRevenue - paidAmount;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid': return <Badge className="bg-emerald-500/15 text-emerald-700">Paid</Badge>;
      case 'sent': return <Badge className="bg-blue-500/15 text-blue-700">Sent</Badge>;
      case 'draft': return <Badge variant="secondary">Draft</Badge>;
      case 'overdue': return <Badge className="bg-red-500/15 text-red-700">Overdue</Badge>;
      default: return null;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-muted-foreground mt-1">Create and manage client invoices</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">£{totalRevenue.toFixed(0)}</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-emerald-600">£{paidAmount.toFixed(0)}</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-amber-600">£{outstandingAmount.toFixed(0)}</span>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>All invoices issued to clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm font-medium">
                        {invoice.number}
                      </TableCell>
                      <TableCell className="text-sm">Client {invoice.clientId}</TableCell>
                      <TableCell className="text-sm">
                        {format(parseISO(invoice.issueDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(parseISO(invoice.dueDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="font-medium">
                        £{invoice.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(invoice.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status !== 'paid' && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
