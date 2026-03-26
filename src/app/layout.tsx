import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prediction Bot Dashboard",
  description: "Manage prediction trading bots, signals and workers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="var(--brand-primary, #3b82f6)" showSpinner={true} />
        {children}
      </body>
    </html>
  );
}
