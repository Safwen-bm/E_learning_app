import { Logo } from './logo';
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
    return (
        <div className="flex h-screen flex-col w-72 bg-card border-r border-border">
            {/* Top Logo */}
            <div className="px-6 py-6 border-b border-border">
                <Logo />
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto px-3 py-6">
                <SidebarRoutes />
            </div>
        </div>
    );
};