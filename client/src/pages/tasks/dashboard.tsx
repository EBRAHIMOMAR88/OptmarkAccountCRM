import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Filter, 
  Calendar, 
  Flag, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Columns
} from "lucide-react";
import { mockTasks, Task, taskStatusColors, taskPriorityColors, TaskStatus } from "@/lib/tasks";
import { format, parseISO, isAfter, isBefore, addDays } from "date-fns";
import { cn } from "@/lib/utils";

export default function TasksDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');

  const filteredTasks = mockTasks.filter(task => 
    (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.clientName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter.length === 0 || statusFilter.includes(task.status))
  );

  const getStatusBadge = (status: TaskStatus) => {
    return (
      <Badge variant="outline" className={cn("capitalize", taskStatusColors[status])}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityIcon = (priority: string) => {
    return (
      <Flag className={cn("h-3 w-3 mr-1", taskPriorityColors[priority as keyof typeof taskPriorityColors])} />
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Manage your workload, track deadlines, and monitor team progress.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-muted p-1 rounded-md">
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('list')}
                className="h-8 px-3"
              >
                List
              </Button>
              <Button 
                variant={viewMode === 'board' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('board')}
                className="h-8 px-3"
              >
                Board
              </Button>
            </div>
            <Button className="gap-2 shadow-md">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-2 rounded-lg border border-border/40 shadow-sm">
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground ml-2" />
            <Input 
              placeholder="Search tasks or clients..." 
              className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-dashed">
                  <Filter className="h-3.5 w-3.5" />
                  Status
                  {statusFilter.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                      {statusFilter.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['todo', 'in_progress', 'review', 'blocked', 'completed'].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setStatusFilter([...statusFilter, status]);
                      } else {
                        setStatusFilter(statusFilter.filter(s => s !== status));
                      }
                    }}
                    className="capitalize"
                  >
                    {status.replace('_', ' ')}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[300px]">Task Details</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No tasks found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id} className="group hover:bg-muted/30">
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-sm flex items-center">
                            {getPriorityIcon(task.priority)}
                            {task.title}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[280px]">
                            {task.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{task.clientName}</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(task.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className={cn(
                            isBefore(parseISO(task.dueDate), new Date()) && task.status !== 'completed' 
                              ? "text-red-600 font-medium" 
                              : ""
                          )}>
                            {format(parseISO(task.dueDate), "MMM d, yyyy")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {task.assignedTo ? (
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                              {task.assignedTo}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Unassigned</span>
                        )}
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
                            <DropdownMenuItem>Edit task</DropdownMenuItem>
                            <DropdownMenuItem>Change status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-220px)] overflow-x-auto pb-4">
            {['todo', 'in_progress', 'review', 'completed'].map((columnStatus) => {
              const columnTasks = filteredTasks.filter(t => 
                columnStatus === 'completed' ? t.status === 'completed' : 
                columnStatus === 'in_progress' ? t.status === 'in_progress' :
                columnStatus === 'review' ? t.status === 'review' :
                t.status === 'todo' || t.status === 'blocked'
              );

              return (
                <div key={columnStatus} className="flex flex-col h-full min-w-[280px] bg-muted/20 rounded-lg border border-border/60">
                  <div className="p-3 font-medium text-sm flex items-center justify-between border-b border-border/40 bg-muted/30">
                    <span className="capitalize flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", 
                        columnStatus === 'completed' ? "bg-emerald-500" :
                        columnStatus === 'review' ? "bg-purple-500" :
                        columnStatus === 'in_progress' ? "bg-blue-500" : "bg-slate-500"
                      )} />
                      {columnStatus.replace('_', ' ')}
                    </span>
                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                      {columnTasks.length}
                    </Badge>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {columnTasks.map(task => (
                      <Card key={task.id} className="cursor-grab hover:shadow-md transition-all duration-200 border-border/60 shadow-sm">
                        <CardContent className="p-3 space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <div className="text-sm font-medium leading-tight">{task.title}</div>
                            {getPriorityIcon(task.priority)}
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            {task.clientName}
                          </div>

                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {task.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 mt-1 border-t border-border/40">
                            <div className={cn("text-[10px] flex items-center gap-1", 
                              isBefore(parseISO(task.dueDate), new Date()) && task.status !== 'completed' ? "text-red-600 font-medium" : "text-muted-foreground"
                            )}>
                              <Clock className="h-3 w-3" />
                              {format(parseISO(task.dueDate), "MMM d")}
                            </div>
                            {task.assignedTo && (
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">
                                {task.assignedTo}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
