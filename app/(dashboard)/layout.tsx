import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Desktop Sidebar - fixed on left, hidden on mobile */}
      <aside className="hidden md:flex md:w-72 md:flex-col">
        <Sidebar />
      </aside>

      {/* Main column: Navbar + Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Fixed Navbar */}
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl">
          <Navbar />
        </header>

        {/* Scrollable main content with padding */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}