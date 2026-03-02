import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t, lang } = useLanguage();

  const links = lang === "es"
    ? ["Inicio", "Servicios", "Nuestro Equipo", "Contacto"]
    : ["Home", "Services", "Our Team", "Contact"];

  return (
    <footer id="contacto" className="bg-foreground py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-xl font-bold text-background mb-2">CRETUM</h3>
            <p className="text-xs tracking-[0.3em] text-background/60 mb-4">PARTNERS</p>
            <p className="text-sm text-background/70 leading-relaxed">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm">{t("footer.links")}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-background/60 hover:text-background transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm">{t("footer.contact")}</h4>
            <p className="text-sm text-background/70">info@cretumpartners.com</p>
            <p className="text-sm text-background/70 mt-1">+52 (55) 1234 5678</p>
            <p className="text-sm text-background/70 mt-1">Ciudad de México, México</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-background/10 text-center">
          <p className="text-xs text-background/40">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
