import "@/globals.css";
import { montserrat } from "@/ui/fonts";
import Sidebar from "@/ui/Sidebar/Sidebar";
import Footer from "@/ui/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/images/logo_empresa.png" />
        <title>Innovadent</title>
      </head>
      <body
        className={`${montserrat.className} antialiased h-full flex flex-col`}
        suppressHydrationWarning={true}
      >
        <Sidebar />
        <main className="sm:ml-64 py-10 flex justify-center items-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
