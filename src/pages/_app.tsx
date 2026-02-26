import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Soluciones Informáticas | Tecnología para tu Empresa</title>
        <meta
          name="description"
          content="Venta e instalación de cámaras de seguridad, redes, impresoras, tóner y soporte técnico en Urabá. Soluciones tecnológicas confiables para empresas y hogares."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
