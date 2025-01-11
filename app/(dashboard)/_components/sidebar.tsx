import { Logo } from './logo';
import { SidebarRoutes } from "./sidebar-routes";
import "../../globals.css";

export const Sidebar = () => {
    return ( 
        <div className="h-screen flex flex-col bg-[#f1f6fb] text-gray-800">
            <div className="p-6 flex justify-center">
                <Logo />
            </div>
            <div className="flex-1 overflow-y-auto">
                <SidebarRoutes />
            </div>
        </div>
    );
};
