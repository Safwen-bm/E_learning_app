import { SignUp } from "@clerk/nextjs";
import { authAppearance } from "@/lib/clerk-appearance";

export default function Page() {
  return <SignUp appearance={authAppearance} fallbackRedirectUrl="/dashboard" />;
}