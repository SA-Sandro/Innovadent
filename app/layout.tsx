import "@/globals.css";
import { montserrat } from "@/ui/fonts";
import Sidebar from "@/ui/sidebar/Sidebar";
import Footer from "@/ui/footer/Footer";
import { SessionProvider } from "@/context/SessionContext";

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
        className={`${montserrat.className} antialiased h-full`}
        suppressHydrationWarning={true}
      >
        <SessionProvider>
          <Sidebar />
          <main className="relative sm:ml-64 py-10 flex justify-center items-center">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
