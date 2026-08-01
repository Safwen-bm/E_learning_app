import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="relative flex items-center h-20 px-6 border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-lg">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};