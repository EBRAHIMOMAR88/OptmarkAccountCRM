import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockClientServices, mockServices } from "@/lib/services";
import { mockBusinessClients, mockIndividualClients } from "@/lib/mock-data";
import { format, addMonths, startOfMonth } from "date-fns";
import { CalendarDays, Users, AlertCircle } from "lucide-react";

export default function WorkloadDistribution() {
  // Simple simulation of workload distribution
  const months = Array.from({ length: 6 }, (_, i) => addMonths(startOfMonth(new Date()), i));

  const getWorkloadForMonth = (date: Date) => {
    // Mock logic: Randomly assign simulation count based on month index for demo
    // In real app, we would check client service deadlines falling in this month
    const monthKey = format(date, "yyyy-MM");
    const baseCount = 5 + Math.floor(Math.random() * 10);
    return {
      vat: Math.floor(baseCount * 0.4),
      payroll: Math.floor(baseCount * 0.3),
      accounts: Math.floor(baseCount * 0.3),
      total: baseCount
    };
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Workload Distribution</h1>
          <p className="text-muted-foreground mt-1">
            Visualise upcoming deadlines and resource requirements across the next 6 months.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Active Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground mt-1">+8 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Deadlines (30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unassigned Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">5</div>
              <p className="text-xs text-muted-foreground mt-1">Needs staff allocation</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>6-Month Forecast</CardTitle>
            <CardDescription>Projected workload based on active client services.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-6">
              {months.map((date, i) => {
                const workload = getWorkloadForMonth(date);
                const isHighLoad = workload.total > 12;
                
                return (
                  <div key={i} className={`rounded-lg border p-4 flex flex-col gap-3 ${isHighLoad ? 'bg-amber-50/50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800' : 'bg-card'}`}>
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-semibold">{format(date, "MMM yyyy")}</span>
                      {isHighLoad && <AlertCircle className="h-4 w-4 text-amber-500" />}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-xs">VAT Returns</span>
                        <span className="font-mono font-medium">{workload.vat}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-xs">Payroll</span>
                        <span className="font-mono font-medium">{workload.payroll}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-xs">Accounts</span>
                        <span className="font-mono font-medium">{workload.accounts}</span>
                      </div>
                      <div className="pt-2 border-t mt-1 flex justify-between font-bold">
                        <span>Total</span>
                        <span>{workload.total}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>Breakdown of active services by category.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-12 bg-muted rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: '40%' }}>
                Tax (40%)
              </div>
              <div className="h-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: '30%' }}>
                Accounts (30%)
              </div>
              <div className="h-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: '20%' }}>
                Payroll (20%)
              </div>
              <div className="h-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: '10%' }}>
                Other
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">Tax Services</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-muted-foreground">Annual Accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm text-muted-foreground">Payroll</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-muted-foreground">Compliance & Advisory</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
