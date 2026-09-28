import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import VisuallyHidden from "./VisuallyHidden";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-70 transition">
        <Menu className="h-6 w-6 text-muted-foreground" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 bg-background">
        <SheetTitle>
          <VisuallyHidden>Main Navigation</VisuallyHidden>
        </SheetTitle>
        <SheetDescription>
          <VisuallyHidden>AcademyX mobile menu</VisuallyHidden>
        </SheetDescription>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};