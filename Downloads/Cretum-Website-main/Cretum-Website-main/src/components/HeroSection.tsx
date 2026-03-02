import heroImage from "@/assets/hero-skyline.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-fade-in">
          <em className="text-primary not-italic">{t("hero.title.1")}</em>{" "}
          <span className="text-foreground">{t("hero.title.2")}</span>
        </h1>

        <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm rounded-lg p-8 border border-border animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-sm md:text-base leading-relaxed text-foreground">{t("hero.p1")}</p>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground">{t("hero.p2")}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <a href="#servicios" className="px-8 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
            {t("hero.cta1")}
          </a>
          <a href="#contacto" className="px-8 py-3 border border-primary text-primary rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
            {t("hero.cta2")}
          </a>
        </div>
      </div>
    </section>
  );
}
