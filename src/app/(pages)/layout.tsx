'use client'

import { Footer, Navbar } from "@/components";
import { WhatsAppFloat } from "@/components/ui-components/whatsAppFloat";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const pathname = usePathname();
   const hideLayoutRoutes = ["/calculator"];

  const shouldHideLayout = hideLayoutRoutes.includes(pathname);
  return (
    <html lang="en">
      <body>
         {!shouldHideLayout && <Navbar />}
        {children}
        {!shouldHideLayout && <Footer />}
         <WhatsAppFloat 
          message="Hi! I'm interested in your services and would like to know more."
        />
      </body>
    </html>
  );
}
