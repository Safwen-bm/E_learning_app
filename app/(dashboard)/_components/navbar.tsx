import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex items-center h-16 px-6 border-b border-border bg-background">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};