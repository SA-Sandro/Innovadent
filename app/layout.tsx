import "@/globals.css";
import { SessionProvider } from "@/context/SessionContext";
import Footer from "../ui/footer/Footer";
import Sidebar from "../ui/sidebar/Sidebar";
import { poppins } from "../ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/images/logo_empresa.png" />
        <title>Innovadent</title>
      </head>
      <body
        className={`${poppins.className} antialiased h-full relative`}
        suppressHydrationWarning={true}
      >
        <SessionProvider>
          <Sidebar />
          <main className="relative sm:ml-64 pt-10 pb-20 flex justify-center items-center">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
