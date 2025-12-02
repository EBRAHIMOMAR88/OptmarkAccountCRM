import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CheckSquare, 
  BarChart3, 
  LogOut,
  Menu,
  Briefcase,
  CalendarClock,
  Clock,
  FileText,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Individual Clients", href: "/individual-clients", icon: Users },
  { name: "Business Clients", href: "/business-clients", icon: Building2 },
  { name: "Services Catalog", href: "/services", icon: Briefcase },
  { name: "Workload", href: "/workload", icon: CalendarClock },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Timesheet", href: "/timesheet", icon: Clock },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
];

export function Sidebar() {
  const [location] = useLocation();
  const isMobile = useIsMobile();

  const NavContent = () => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded bg-primary-foreground text-primary flex items-center justify-center">
            OA
          </div>
          <span>Optmark CRM</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </a>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2 text-sidebar-foreground/70">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-xs font-medium">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
            <span className="text-xs text-sidebar-foreground/50">Accountant</span>
          </div>
          <LogOut className="ml-auto h-4 w-4 cursor-pointer hover:text-sidebar-foreground" />
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 border-r-0">
          <NavContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 bottom-0 z-40">
      <NavContent />
    </div>
  );
}
