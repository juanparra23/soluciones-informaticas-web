import React from 'react';

const HeroTitle = () => {
  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-textoprincipal font-extrabold text-center leading-[1.05] tracking-tight">
      Soluciones Informáticas
    </h1>
  );
};

const HeroTitle2 = ({ text2 }: { text2: string }) => {
  return (
    <h2 className="text-3xl sm:text-4xl md:text-5xl text-textoprincipal font-bold text-center leading-tight">
      {text2}
    </h2>
  );
};

const HeroTitle3 = ({ text3 }: { text3: string }) => {
  return (
    <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-extrabold text-center leading-tight">
      {text3}
    </h2>
  );
};

const Title = ({ tittle }: { tittle: string }) => {
  return (
    <p className="text-4xl sm:text-5xl font-extrabold tracking-tight gradient2 text-center">
      {tittle}
    </p>
  );
};

const SubTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-textoprincipal font-medium text-center leading-tight">
      {title}
    </h2>
  );
};

const SubText = ({ text }: { text: string }) => {
  return (
    <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-textosecundario font-medium text-center leading-relaxed">
      {text}
    </p>
  );
};

const Subtext2 = ({ title }: { title: string }) => {
  return (
    <p className="text-xl sm:text-2xl text-textoprincipal font-bold text-center">
      {title}
    </p>
  );
};

const SubText3 = ({ text }: { text: string }) => {
  return (
    <p className="mt-3 text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed text-center">
      {text}
    </p>
  );
};

const Nosotros = ({ text }: { text: string }) => {
  return <h2 className="text-2xl gradient2 font-bold">{text}</h2>;
};

const AltText = ({ text }: { text: string }) => {
  return (
    <h2 className="text-[18px] text-textosecundario font-medium text-center">
      {text}
    </h2>
  );
};

const AltTitle = ({ title2 }: { title2: string }) => {
  return (
    <h2 className="text-3xl gradient2 font-bold text-center">
      {title2}
    </h2>
  );
};

export {
  HeroTitle,
  HeroTitle2,
  HeroTitle3,
  SubTitle,
  SubText,
  AltText,
  AltTitle,
  Nosotros,
  Subtext2,
  Title,
  SubText3,
};