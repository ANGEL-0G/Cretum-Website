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
  "nav.gvv": { es: "GVV", en: "GVV" },
  "nav.mvp": { es: "MVP Private Equity", en: "MVP Private Equity" },
  "nav.trendrating": { es: "Trendrating Licensing", en: "Trendrating Licensing" },
  "nav.wealth": { es: "Wealth Management", en: "Wealth Management" },
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

  // Trendrating Modal
  "tr.title": { es: "TrendRating", en: "TrendRating" },
  "tr.subtitle": { es: "Alpha Generating Software", en: "Alpha Generating Software" },
  "tr.desc": {
    es: "TrendRating es una empresa de tecnología financiera que ofrece una plataforma de análisis de tendencias para el mercado de valores. La plataforma utiliza un algoritmo de aprendizaje automático para identificar tendencias en los precios de las acciones, los índices y otros activos.",
    en: "TrendRating is a financial technology company that offers a trend analysis platform for the stock market. The platform uses a machine learning algorithm to identify trends in stock prices, indices, and other assets.",
  },
  "tr.h1": { es: "Análisis de tendencias con IA", en: "AI-powered trend analysis" },
  "tr.h2": { es: "Análisis de fundamentos", en: "Fundamental analysis" },
  "tr.h3": { es: "Herramienta de backtesting", en: "Backtesting tool" },
  "tr.h4": { es: "Estrategias de inversión", en: "Investment strategies" },
  "tr.algo": {
    es: "La plataforma de TrendRating proporciona un análisis fundamental de cada activo, incluyendo información sobre la empresa, la industria y el mercado. Su herramienta de backtesting permite a los inversores probar diferentes estrategias de inversión con datos históricos para optimizar sus decisiones.",
    en: "TrendRating's platform provides fundamental analysis of each asset, including information about the company, industry, and market. Its backtesting tool allows investors to test different investment strategies with historical data to optimize their decisions.",
  },
  // Wealth Management Modal
  "wm.title": { es: "Wealth Management", en: "Wealth Management" },
  "wm.subtitle": { es: "Beyond Money", en: "Beyond Money" },
  "wm.desc1": {
    es: "Cretum Partners redefine la gestión de patrimonio con un enfoque centrado en la confianza como su valor central para el crecimiento sostenible. Su propuesta de Valor Agregado se manifiesta a través de la simplificación de situaciones y procesos financieros complejos, permitiendo a los clientes comprender, manejar y administrar sus activos de manera efectiva. La eficiencia impulsa su estrategia, identificando proactivamente las necesidades y oportunidades para lograr objetivos financieros de manera ágil, respaldada por un profundo conocimiento y análisis del mercado.",
    en: "Cretum Partners redefines wealth management with an approach centered on trust as its core value for sustainable growth. Its Value-Added proposition is manifested through the simplification of complex financial situations and processes, enabling clients to understand, manage, and administer their assets effectively. Efficiency drives its strategy, proactively identifying needs and opportunities to achieve financial objectives agilely, backed by deep market knowledge and analysis.",
  },
  "wm.desc2": {
    es: "El equipo de Cretum Partners, con una trayectoria destacada, ha cultivado relaciones duraderas con clientes, intermediarios y contrapartes, fortaleciendo su capacidad para anticipar y superar obstáculos. Esta experiencia, combinada con la independencia de conflictos de interés, posiciona a la empresa para ofrecer soluciones personalizadas, maximizando resultados y minimizando riesgos. En conjunto, Cretum Partners se destaca como un líder en la gestión de patrimonio, ofreciendo no solo resultados financieros sólidos, sino también relaciones arraigadas en la confianza y la excelencia a lo largo del tiempo.",
    en: "The Cretum Partners team, with an outstanding track record, has cultivated lasting relationships with clients, intermediaries, and counterparts, strengthening its ability to anticipate and overcome obstacles. This experience, combined with independence from conflicts of interest, positions the firm to offer personalized solutions, maximizing results and minimizing risks. Overall, Cretum Partners stands out as a leader in wealth management, offering not only solid financial results but also relationships rooted in trust and excellence over time.",
  },
  "wm.h1": { es: "Confianza como valor central", en: "Trust as a core value" },
  "wm.h2": { es: "Simplificación de procesos complejos", en: "Simplification of complex processes" },
  "wm.h3": { es: "Independencia de conflictos de interés", en: "Independence from conflicts of interest" },
  "wm.h4": { es: "Relaciones duraderas con clientes", en: "Lasting client relationships" },

  // Team Modal
  "team.title": { es: "Nuestro Equipo", en: "Our Team" },
  "team.subtitle": { es: "Conoce a los profesionales detrás de Cretum Partners", en: "Meet the professionals behind Cretum Partners" },
  "team.m1.name": { es: "Carlos García", en: "Carlos García" },
  "team.m1.role": { es: "Director General / CEO", en: "Chief Executive Officer" },
  "team.m1.bio": { es: "Con más de 20 años de experiencia en mercados financieros, Carlos lidera la visión estratégica de Cretum Partners, enfocándose en el crecimiento sostenible y la generación de valor para los clientes.", en: "With over 20 years of experience in financial markets, Carlos leads Cretum Partners' strategic vision, focusing on sustainable growth and value generation for clients." },
  "team.m2.name": { es: "María López", en: "María López" },
  "team.m2.role": { es: "Directora de Inversiones / CIO", en: "Chief Investment Officer" },
  "team.m2.bio": { es: "María supervisa las estrategias de inversión del portafolio, aplicando un análisis riguroso y una gestión de riesgos disciplinada para optimizar los rendimientos.", en: "María oversees portfolio investment strategies, applying rigorous analysis and disciplined risk management to optimize returns." },
  "team.m3.name": { es: "Andrés Martínez", en: "Andrés Martínez" },
  "team.m3.role": { es: "Director de Operaciones / COO", en: "Chief Operating Officer" },
  "team.m3.bio": { es: "Andrés gestiona las operaciones diarias de la firma, asegurando la eficiencia operativa y el cumplimiento regulatorio en todos los procesos.", en: "Andrés manages the firm's daily operations, ensuring operational efficiency and regulatory compliance across all processes." },
  "team.m4.name": { es: "Laura Hernández", en: "Laura Hernández" },
  "team.m4.role": { es: "Analista Senior de Inversiones", en: "Senior Investment Analyst" },
  "team.m4.bio": { es: "Laura se especializa en el análisis fundamental y cuantitativo de oportunidades de inversión en mercados globales de renta variable y renta fija.", en: "Laura specializes in fundamental and quantitative analysis of investment opportunities in global equity and fixed income markets." },
  "team.m5.name": { es: "Roberto Sánchez", en: "Roberto Sánchez" },
  "team.m5.role": { es: "Director de Riesgos / CRO", en: "Chief Risk Officer" },
  "team.m5.bio": { es: "Roberto implementa y supervisa los marcos de gestión de riesgos, protegiendo los activos de los clientes mediante estrategias de cobertura avanzadas.", en: "Roberto implements and oversees risk management frameworks, protecting client assets through advanced hedging strategies." },
  "team.m6.name": { es: "Patricia Ruiz", en: "Patricia Ruiz" },
  "team.m6.role": { es: "Directora de Relación con Clientes", en: "Client Relations Director" },
  "team.m6.bio": { es: "Patricia cultiva relaciones sólidas con los clientes, asegurando una comunicación transparente y un servicio personalizado que responda a sus necesidades.", en: "Patricia cultivates strong client relationships, ensuring transparent communication and personalized service that meets their needs." },

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
