import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head > 
      <link rel="icon" href="/favicon.png" />
      </Head>
      <Head>
      <title>Soluciones Informáticas Urabá | Cámaras, Redes y Soporte Técnico</title>
      <meta
      name="description"
      content="Instalación de cámaras de seguridad, redes, soporte técnico y soluciones tecnológicas en Urabá, Apartadó, Carepa y Chigorodó."
      />
      </Head>
      
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
