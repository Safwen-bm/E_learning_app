import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import "../../globals.css";

export const Navbar = () => {
    return ( 
        <div className="p-4 h-full flex items-center bg-[#f1f6fb] shadow-md">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    );
};
