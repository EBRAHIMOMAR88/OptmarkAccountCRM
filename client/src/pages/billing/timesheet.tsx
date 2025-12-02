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
import { Plus, Clock, DollarSign } from "lucide-react";
import { mockTimeEntries } from "@/lib/timetracking";
import { format, parseISO } from "date-fns";

export default function Timesheet() {
  const totalHours = mockTimeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const totalBillable = mockTimeEntries
    .filter(e => e.billable)
    .reduce((sum, entry) => sum + (entry.hours * (entry.rate || 0)), 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
            <p className="text-muted-foreground mt-1">Track billable hours and manage project time</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Log Time
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">{totalHours}h</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Billable Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                <span className="text-2xl font-bold">£{totalBillable.toFixed(0)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-500" />
                <span className="text-2xl font-bold">£{(totalBillable / totalHours).toFixed(0)}/h</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Time Entries</CardTitle>
            <CardDescription>Logged hours across all clients and tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client/Task</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTimeEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        {format(parseISO(entry.date), "MMM d")}
                      </TableCell>
                      <TableCell className="text-sm">{entry.clientId}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {entry.description}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{entry.hours}h</TableCell>
                      <TableCell className="text-sm">£{entry.rate}/h</TableCell>
                      <TableCell className="font-medium">
                        £{(entry.hours * (entry.rate || 0)).toFixed(0)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.billable ? 'default' : 'secondary'}>
                          {entry.billable ? 'Billable' : 'Non-billable'}
                        </Badge>
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
