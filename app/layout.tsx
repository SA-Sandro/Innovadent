import "@/globals.css";
import Image from "next/image";
import { montserrat } from "@/ui/fonts";

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
      <body className={`${montserrat.className} antialiased`}>
        <header className="">
          <div className="flex items-center pt-3">
            <Image
              width={50}
              height={50}
              src="/images/logo_empresa.png"
              alt="Logo de Innovadent"
            ></Image>
            <div>
              <h3 className="">Innovadent</h3>
            </div>
          </div>
        </header>
        {children}
        <footer className="">
          <div className="">
            <div className="">
              C. Pacífico, Málaga
            </div>
            <div className="">
              <ul className="">
                <a href="index.html">
                  <li>Inicio</li>
                </a>
                <a href="">
                  <li>Crear cita</li>
                </a>
                <a href="">
                  <li>Ver citas</li>
                </a>
              </ul>
            </div>
          </div>
          <div className="nombre d-flex justify-content-center">
            Copyright © | Coded by Sandro Suárez
          </div>
        </footer>
      </body>
    </html>
  );
}
