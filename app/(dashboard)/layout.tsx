import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { ReactNode } from "react"; 
import "../globals.css";

interface DashboardLayoutProps {
    children: ReactNode; 
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => { 
    return ( 
        <div className="h-full flex flex-col"> 
            <div className="h-[80px] md:pl-56 fixed inset-x-0 top-0 w-full z-50"> 
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 h-full pt-[80px]"> 
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
