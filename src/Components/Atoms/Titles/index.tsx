
import React from 'react'



const HeroTitle = () => {
  return (
    <h1 className="text-6xl text-textoprincipal text-bold text-center max-w-full">
      Soluciones Informaticas
    </h1>
  );
};

const HeroTitle2 = ({ text2 }: { text2: string }) => {
  return (
    <h2 className="text-5xl text-textoprincipal text-bold text-center">
      {text2}
    </h2>
  );
};

const HeroTitle3 = ({ text3 }: { text3: string }) => {
  return (
    <h2 className="text-5xl text-white font-extrabold text-center">{text3}</h2>
  );
};

const Title = ({ tittle }: { tittle: string }) => {
  return (
    <p className="text-4xl sm:text-5xl font-extrabold tracking-tight gradient2">
      {tittle}
    </p>
  );
};

const SubTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="text-3xl text-textoprincipal text-bold text-center">
      {title}
    </h2>
  );
};

const SubText = ({ text }: { text: string }) => {
  return (
    <p className="text-sm sm:text-base text-textosecundario text-bold text-center">
      {text}
    </p>
  );
};

const Subtext2 = ({ title }: { title: string }) => {
  return (
    <p className="text-2xl text-textoprincipal text-bold text-center">
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
    <h2 className="text-[18px] text-textosecundario text-bold text-center">
      {text}
    </h2>
  );
};

const AltTitle = ({ title2 }: { title2: string }) => {
  return <h2 className="text-3xl gradient2 text-bold text-center">{title2}</h2>;
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