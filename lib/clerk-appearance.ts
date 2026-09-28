import { dark } from "@clerk/themes";

// Shared Clerk styling for the sign-in and sign-up pages,
// matched to the landing page chalkboard theme.
export const authAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#E8B84A",
    colorTextOnPrimaryBackground: "#0E211D",
    colorBackground: "#1E3B34",
    colorInputBackground: "#152C27",
    colorInputText: "#ECEFE9",
    colorText: "#ECEFE9",
    colorTextSecondary: "#B9C4BC",
    colorNeutral: "#ECEFE9",
    borderRadius: "0.25rem",
  },
  elements: {
    card: {
      boxShadow: "none",
      border: "1px solid rgba(236, 239, 233, 0.12)",
    },
    headerTitle: {
      fontFamily: "var(--font-fraunces), serif",
      fontWeight: 500,
    },
  },
};