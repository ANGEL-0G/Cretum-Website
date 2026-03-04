import { useRef } from "react";
import heroImage from "@/assets/hero-skyline.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  const blocks = [
    { key: "hero.p1", icon: "🏛" },
    { key: "hero.p2", icon: "📈" },
  ];

  return (
    <>
      {/* Full-screen title */}
      <section
        id="inicio"
        className="snap-start relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight animate-fade-in">
            <em className="text-primary not-italic font-serif font-medium block">
              {t("hero.title.1")}
            </em>
            <span className="text-foreground">{t("hero.title.2")}</span>
          </h1>

          <div
            className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <a
              href="#servicios"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              {t("hero.cta1")}
            </a>
            <a
              href="#contacto"
              className="px-8 py-3 border border-primary text-primary rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-200"
            >
              {t("hero.cta2")}
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in"
            style={{ animationDelay: "1s", animationFillMode: "both" }}
          >
            <div className="w-6 h-10 border-2 border-foreground/40 rounded-full flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-[bounce_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </section>

      {/* Description blocks */}
      {blocks.map((block) => (
        <section
          key={block.key}
          className="snap-start h-screen flex items-center justify-center px-6 bg-background"
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-5xl md:text-6xl block mb-6">{block.icon}</span>
            <p className="text-lg md:text-2xl leading-relaxed text-foreground/90 font-light">
              {t(block.key)}
            </p>
          </div>
        </section>
      ))}
    </>
  );
}
