import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Sidebar />
      <main className="lg:pl-64 min-h-screen transition-all duration-300">
        <div className="container mx-auto p-6 md:p-8 max-w-7xl">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
