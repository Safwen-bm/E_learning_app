import { SignIn } from "@clerk/nextjs";
import { authAppearance } from "@/lib/clerk-appearance";

export default function Page() {
  return <SignIn appearance={authAppearance} fallbackRedirectUrl="/dashboard" />;
}