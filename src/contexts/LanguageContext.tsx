import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.inicio": { es: "Inicio", en: "Home" },
  "nav.servicios": { es: "Servicios", en: "Services" },
  "nav.equipo": { es: "Nuestro Equipo", en: "Our Team" },
  "nav.contacto": { es: "Contacto", en: "Contact" },
  "nav.gestion": { es: "Gestión de Activos", en: "Asset Management" },
  "nav.fondos": { es: "Fondos de Pensiones", en: "Pension Funds" },
  "nav.carteras": { es: "Carteras Institucionales", en: "Institutional Portfolios" },
  "nav.asesoria": { es: "Asesoría Financiera", en: "Financial Advisory" },
  "nav.directivos": { es: "Directivos", en: "Executives" },
  "nav.analistas": { es: "Analistas", en: "Analysts" },
  "nav.carreras": { es: "Carreras", en: "Careers" },

  // Hero
  "hero.title.1": { es: "Passion", en: "Passion" },
  "hero.title.2": { es: "Beyond Money", en: "Beyond Money" },
  "hero.p1": {
    es: "Fundada en 2014 por un equipo con vasta experiencia en los mercados financieros globales, Cretum se distingue como gestor independiente especializado en activos institucionales.",
    en: "Founded in 2014 by a team with vast experience in global financial markets, Cretum stands out as an independent manager specializing in institutional assets.",
  },
  "hero.p2": {
    es: "Nos enfocamos en la gestión de fondos de pensiones gubernamentales, fondos institucionales y carteras de individuos de alto patrimonio en México y Latinoamérica. Buscamos optimizar los rendimientos ajustados al riesgo mediante estrategias diversificadas probadas y un riguroso control de riesgos con enfoque patrimonial.",
    en: "We focus on managing government pension funds, institutional funds, and portfolios of high-net-worth individuals in Mexico and Latin America. We seek to optimize risk-adjusted returns through proven diversified strategies and rigorous risk management with a wealth-focused approach.",
  },
  "hero.cta1": { es: "Nuestros Servicios", en: "Our Services" },
  "hero.cta2": { es: "Contáctanos", en: "Contact Us" },

  // Services
  "services.intro": {
    es: "ofrece servicios que son las herramientas ideales para alcanzar tus objetivos.",
    en: "offers services that are the ideal tools to achieve your goals.",
  },

  // GVV Modal
  "gvv.title": { es: "Growth, Value and Volatility (GVV)", en: "Growth, Value and Volatility (GVV)" },
  "gvv.subtitle": { es: "Fondo Multiestratégico · Multidivisas · Valuado en USD", en: "Multi-Strategy Fund · Multi-Currency · Valued in USD" },
  "gvv.desc": {
    es: "Fondo que invierte en tres estrategias complementarias para maximizar rendimientos ajustados al riesgo en mercados globales.",
    en: "Fund that invests in three complementary strategies to maximize risk-adjusted returns in global markets.",
  },
  "gvv.growth": { es: "Crecimiento", en: "Growth" },
  "gvv.growth.desc": { es: "Compañías de tecnología de alto crecimiento.", en: "High-growth technology companies." },
  "gvv.value": { es: "Valor", en: "Value" },
  "gvv.value.desc": { es: "Compañías que generen valor a largo plazo.", en: "Companies that generate long-term value." },
  "gvv.hedge": { es: "Coberturas de Volatilidad", en: "Volatility Hedging" },
  "gvv.hedge.desc": { es: "Reducción de riesgo vía Delta Hedging.", en: "Risk reduction via Delta Hedging." },
  "gvv.chart.title": { es: "Valor del Portafolio", en: "Portfolio Value" },
  "gvv.chart.label": { es: "Valor", en: "Value" },
  "gvv.philosophy": {
    es: "Cretum Partners invierte bajo la filosofía de crecimiento e inversión a largo plazo, rodeado de confianza, seguridad y transparencia en un ambiente protegido. Alcanzamos a ver lo que otros no pueden, esa es nuestra ventaja competitiva.",
    en: "Cretum Partners invests under a philosophy of long-term growth and investment, surrounded by trust, security and transparency in a protected environment. We see what others cannot, that is our competitive advantage.",
  },
  "gvv.download": { es: "Descargar Carta Mensual de GVV", en: "Download GVV Monthly Letter" },
  "gvv.noDoc": { es: "Carta Mensual no disponible aún", en: "Monthly Letter not yet available" },

  // MVP Modal
  "mvp.title": { es: "Manhattan Venture Partners", en: "Manhattan Venture Partners" },
  "mvp.subtitle": { es: "Tomorrow's IPOs · Today", en: "Tomorrow's IPOs · Today" },
  "mvp.desc": {
    es: "Es una firma que invierte en empresas privadas dentro del sector de tecnología. MVP es regulado por FINRA y SEC. La tesis de inversión se enfoca en compañías en etapa PRE-IPO mediante una estrategia secundaria.",
    en: "A firm that invests in private companies within the technology sector. MVP is regulated by FINRA and SEC. The investment thesis focuses on PRE-IPO stage companies through a secondary strategy.",
  },
  "mvp.h1": { es: "Regulado por FINRA y SEC", en: "Regulated by FINRA and SEC" },
  "mvp.h2": { es: "+10 ciudades alrededor del mundo", en: "+10 cities around the world" },
  "mvp.h3": { es: "Estrategia Pre-IPO secundaria", en: "Secondary Pre-IPO Strategy" },
  "mvp.h4": { es: "Informe mensual: Venture Bytes", en: "Monthly report: Venture Bytes" },
  "mvp.hq": {
    es: "Los headquarters se encuentran en Nueva York y San Francisco; también contamos con presencia en +10 ciudades alrededor del mundo.",
    en: "Headquarters are located in New York and San Francisco; we also have a presence in +10 cities around the world.",
  },
  "mvp.analysis": {
    es: "MVP cuenta con un departamento de análisis que reduce la asimetría de mercados privados. A través de su informe mensual, Venture Bytes, se destacan tendencias y oportunidades emergentes en el panorama tecnológico global.",
    en: "MVP has an analysis department that reduces private market asymmetry. Through its monthly report, Venture Bytes, it highlights trends and emerging opportunities in the global technology landscape.",
  },
  "mvp.portfolio": {
    es: "Empresas en portafolio — invirtiendo siempre en etapa privada",
    en: "Portfolio companies — always investing at the private stage",
  },

  // Footer
  "footer.desc": {
    es: "Passion Beyond Money — Gestión independiente de activos institucionales desde 2014.",
    en: "Passion Beyond Money — Independent institutional asset management since 2014.",
  },
  "footer.links": { es: "Enlaces", en: "Links" },
  "footer.contact": { es: "Contacto", en: "Contact" },
  "footer.rights": {
    es: "© 2024 Cretum Partners. Todos los derechos reservados.",
    en: "© 2024 Cretum Partners. All rights reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const t = (key: string) => translations[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
