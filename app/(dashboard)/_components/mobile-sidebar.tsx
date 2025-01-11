import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import VisuallyHidden from "./VisuallyHidden";
import { Sidebar } from "./sidebar"; // Make sure this import path is correct
import "../../globals.css";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white shadow-lg transition-transform duration-300 ease-in-out">
                <DialogTitle>
                    <VisuallyHidden>Mobile Sidebar</VisuallyHidden>
                </DialogTitle>
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};
