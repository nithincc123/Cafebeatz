"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Routes where the global Navbar & Footer should be suppressed
const CHROME_EXCLUDED_ROUTES = ["/reservation"];

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideChrome = CHROME_EXCLUDED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
}
