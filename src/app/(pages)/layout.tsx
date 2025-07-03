import { Footer, Navbar } from "@/components";
import { WhatsAppFloat } from "@/components/ui-components/whatsAppFloat";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
         <WhatsAppFloat 
          phoneNumber="1234567890" 
          message="Hi! I'm interested in your services and would like to know more."
        />
      </body>
    </html>
  );
}
