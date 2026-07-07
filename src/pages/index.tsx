import React from "react";
import Head from "next/head";

import Hero from "@/Organism/Hero";
import Features from "@/Organism/Features";
import Choose from "@/Organism/Choose";
import LoNuevo from "@/Organism/Lonuevo";

const Index = () => {
  return (
    <>
      <Head>
        <title>
          Soluciones Informáticas Urabá 
        </title>

        <meta
          name="description"
          content="Brindamos soluciones tecnológicas en cámaras de seguridad, impresoras, redes, soporte técnico, computadores y tecnología para empresas y hogares en Urabá."
        />

        <meta
          name="keywords"
          content="cámaras de seguridad, impresoras, redes, soporte técnico, Urabá"
        />

        <meta property="og:title" content="Soluciones Informáticas Urabá" />

        <meta
          property="og:description"
          content="Tecnología, seguridad y soporte profesional para empresas y hogares."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://solucionesinformaticasuraba.co" />

        <link rel="canonical" href="https://solucionesinformaticasuraba.co/" />
      </Head>

      <div>
        <Hero />
        <LoNuevo />
        <Features />
        <Choose />
      </div>
    </>
  );
};

export default Index;