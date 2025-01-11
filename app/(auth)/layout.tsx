import { ReactNode } from 'react';
import "../globals.css";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
