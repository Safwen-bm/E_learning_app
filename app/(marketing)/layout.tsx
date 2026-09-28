import { NavbarLanding } from "./_components/navbar-landing";
import { FooterLanding } from "./_components/footer-landing";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="chalk-texture min-h-full bg-marketing-bg text-marketing-chalk">
      <NavbarLanding />
      <main>{children}</main>
      <FooterLanding />
    </div>
  );
};

export default MarketingLayout;
