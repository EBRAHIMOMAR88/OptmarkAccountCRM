import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { mockIndividualClients } from "@/lib/mock-data";
import { mockInvoices, mockTimeEntries } from "@/lib/timetracking";
import { mockTasks } from "@/lib/tasks";

export default function AnalyticsDashboard() {
  // Calculate metrics
  const totalClients = mockIndividualClients.length;
  const activeClients = mockIndividualClients.filter(c => c.clientStatus === 'active').length;
  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidRevenue = mockInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalBillableHours = mockTimeEntries
    .filter(e => e.billable)
    .reduce((sum, e) => sum + e.hours, 0);
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;
  const taskCompletionRate = mockTasks.length > 0 ? (completedTasks / mockTasks.length * 100).toFixed(0) : 0;

  // Revenue trend data (mock)
  const revenueData = [
    { month: "Aug", value: 2400 },
    { month: "Sep", value: 3200 },
    { month: "Oct", value: 1550 },
  ];

  // Client distribution
  const clientDistribution = [
    { name: "Active", value: activeClients, fill: "#059669" },
    { name: "Inactive", value: mockIndividualClients.filter(c => c.clientStatus === 'inactive').length, fill: "#6b7280" },
    { name: "Left", value: mockIndividualClients.filter(c => c.clientStatus === 'left').length, fill: "#dc2626" },
  ];

  // Monthly billing data
  const billingData = [
    { month: "Oct", billed: 600, paid: 600 },
    { month: "Nov", billed: 350, paid: 350 },
  ];

  // Task status breakdown
  const taskStatus = [
    { name: "Completed", value: completedTasks, fill: "#059669" },
    { name: "In Progress", value: mockTasks.filter(t => t.status === 'in_progress').length, fill: "#3b82f6" },
    { name: "To Do", value: mockTasks.filter(t => t.status === 'todo').length, fill: "#f59e0b" },
    { name: "Blocked", value: mockTasks.filter(t => t.status === 'blocked').length, fill: "#ef4444" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track performance across clients, revenue, and tasks</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClients}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-600 font-medium">{activeClients}</span> active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£{totalRevenue.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-600 font-medium">£{paidRevenue.toFixed(0)}</span> paid
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBillableHours}h</div>
              <p className="text-xs text-muted-foreground mt-1">
                Avg rate <span className="font-medium">£{(paidRevenue / totalBillableHours).toFixed(0)}/h</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taskCompletionRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">{completedTasks}</span> of {mockTasks.length} tasks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <TrendingDown className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£{(totalRevenue - paidRevenue).toFixed(0)}</div>
              <p className="text-xs text-amber-600 mt-1">
                {mockInvoices.filter(i => i.status === 'sent').length} invoice(s) sent
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockTasks.filter(t => t.status === 'in_progress').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                In progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly invoiced amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                  <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                    cursor={{ stroke: "var(--color-muted-foreground)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    dot={{ fill: "#3b82f6", r: 4 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Client Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Client Distribution</CardTitle>
              <CardDescription>By status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={clientDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {clientDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Billing */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Billing</CardTitle>
              <CardDescription>Billed vs paid</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={billingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                  <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  />
                  <Legend />
                  <Bar dataKey="billed" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="paid" fill="#059669" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Task Status */}
          <Card>
            <CardHeader>
              <CardTitle>Task Status</CardTitle>
              <CardDescription>Work breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {taskStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Year-to-Date Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Invoiced</span>
                <span className="font-medium">£{totalRevenue.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Paid</span>
                <span className="font-medium text-emerald-600">£{paidRevenue.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Outstanding</span>
                <span className="font-medium text-amber-600">£{(totalRevenue - paidRevenue).toFixed(0)}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Collection Rate</span>
                <Badge variant="outline">
                  {totalRevenue > 0 ? ((paidRevenue / totalRevenue) * 100).toFixed(0) : 0}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Hours Tracked</span>
                <span className="font-medium">{mockTimeEntries.reduce((sum, e) => sum + e.hours, 0)}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Billable Hours</span>
                <span className="font-medium text-emerald-600">{totalBillableHours}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Non-billable Hours</span>
                <span className="font-medium text-amber-600">
                  {(mockTimeEntries.reduce((sum, e) => sum + e.hours, 0) - totalBillableHours).toFixed(1)}h
                </span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Billability Rate</span>
                <Badge variant="outline">
                  {mockTimeEntries.length > 0 ? (
                    (totalBillableHours / mockTimeEntries.reduce((sum, e) => sum + e.hours, 0) * 100).toFixed(0)
                  ) : (
                    0
                  )}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
