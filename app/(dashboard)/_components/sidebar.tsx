import { Logo } from './logo';
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
    return (
        <div className="flex h-screen flex-col w-72 overflow-hidden bg-background/60 backdrop-blur-2xl border-r border-border/50 shadow-2xl">
            {/* Top Logo */}
            <div className="p-8 flex justify-center border-b border-border/20">
                <Logo />
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <SidebarRoutes />
            </div>

        </div>
    );
};