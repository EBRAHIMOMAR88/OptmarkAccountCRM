import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Dashboard from "@/pages/dashboard";
import IndividualClientsList from "@/pages/clients/individual-list";
import BusinessClientsList from "@/pages/clients/business-list";
import IndividualClientForm from "@/pages/clients/individual-form";
import BusinessClientForm from "@/pages/clients/business-form";
import ServiceCatalog from "@/pages/services/catalog";
import WorkloadDistribution from "@/pages/workload/distribution";
import TasksDashboard from "@/pages/tasks/dashboard";
import ClientDetail from "@/pages/clients/detail";
import Timesheet from "@/pages/billing/timesheet";
import Invoices from "@/pages/billing/invoices";
import AnalyticsDashboard from "@/pages/analytics/dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/individual-clients" component={IndividualClientsList} />
      <Route path="/individual-clients/:id/edit" component={IndividualClientForm} />
      <Route path="/individual-clients/:id" component={ClientDetail} />
      <Route path="/individual-clients/new" component={IndividualClientForm} />
      <Route path="/business-clients" component={BusinessClientsList} />
      <Route path="/business-clients/:id" component={BusinessClientForm} />
      <Route path="/services" component={ServiceCatalog} />
      <Route path="/workload" component={WorkloadDistribution} />
      <Route path="/tasks" component={TasksDashboard} />
      <Route path="/timesheet" component={Timesheet} />
      <Route path="/invoices" component={Invoices} />
      <Route path="/analytics" component={AnalyticsDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
