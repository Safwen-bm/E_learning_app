import { ReactNode } from "react";
import { NavbarLanding } from "@/app/(marketing)/_components/navbar-landing";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="chalk-texture min-h-screen flex flex-col bg-marketing-bg text-marketing-chalk">
      <NavbarLanding />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;