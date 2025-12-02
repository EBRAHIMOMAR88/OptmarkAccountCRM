import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Building2, CheckSquare, TrendingUp, ArrowUpRight } from "lucide-react";
import { mockIndividualClients, mockBusinessClients } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const stats = [
    {
      title: "Individual Clients",
      value: mockIndividualClients.length,
      description: "Total active individuals",
      icon: Users,
      trend: "+12% from last month",
    },
    {
      title: "Business Clients",
      value: mockBusinessClients.length,
      description: "Total active businesses",
      icon: Building2,
      trend: "+4% from last month",
    },
    {
      title: "Pending Tasks",
      value: "12",
      description: "Requires attention",
      icon: CheckSquare,
      trend: "-2% from last week",
    },
    {
      title: "Revenue YTD",
      value: "£124.5k",
      description: "Year to Date",
      icon: TrendingUp,
      trend: "+18% from last year",
    },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your practice performance and client status.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border/40 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions and updates across your clients.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                      UA
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Client Updated
                      </p>
                      <p className="text-xs text-muted-foreground">
                        John Doe's tax return status changed to "In Progress"
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {i}h ago
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3 border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>
                Critical dates for the next 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "VAT Return - Tech Solutions", date: "Oct 07", type: "urgent" },
                  { title: "Payroll Submission", date: "Oct 12", type: "normal" },
                  { title: "Corporation Tax", date: "Oct 15", type: "warning" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border/40 rounded-lg bg-card">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        item.type === 'urgent' ? "bg-red-500" : 
                        item.type === 'warning' ? "bg-amber-500" : "bg-emerald-500"
                      )} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
