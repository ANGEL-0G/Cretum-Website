import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubMenuItem {
  labelKey: string;
  href: string;
}

interface MenuItem {
  labelKey: string;
  href: string;
  submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { labelKey: "nav.inicio", href: "#inicio" },
  {
    labelKey: "nav.servicios",
    href: "#servicios",
    submenu: [
      { labelKey: "nav.gestion", href: "#gestion-activos" },
      { labelKey: "nav.fondos", href: "#fondos-pensiones" },
      { labelKey: "nav.carteras", href: "#carteras" },
      { labelKey: "nav.asesoria", href: "#asesoria" },
    ],
  },
  {
    labelKey: "nav.equipo",
    href: "#equipo",
    submenu: [
      { labelKey: "nav.directivos", href: "#directivos" },
      { labelKey: "nav.analistas", href: "#analistas" },
      { labelKey: "nav.carreras", href: "#carreras" },
    ],
  },
  { labelKey: "nav.contacto", href: "#contacto" },
];

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang, setLang, t } = useLanguage();

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#inicio" className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-wide text-primary">CRETUM</span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground -mt-1">PARTNERS</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => {
            const label = t(item.labelKey);
            return (
              <div
                key={item.labelKey}
                className="relative"
                onMouseEnter={() => item.submenu && handleEnter(item.labelKey)}
                onMouseLeave={handleLeave}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground border border-border rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  {label}
                  {item.submenu && <ChevronDown className="w-3 h-3" />}
                </a>

                {item.submenu && openMenu === item.labelKey && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-md shadow-lg py-1 animate-fade-in">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.labelKey}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                      >
                        {t(sub.labelKey)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setLang("en")}
            className={`w-9 h-9 rounded-full border border-primary text-xs font-semibold transition-colors ${
              lang === "en" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("es")}
            className={`w-9 h-9 rounded-full border border-primary text-xs font-semibold transition-colors ${
              lang === "es" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            ES
          </button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 space-y-2 animate-fade-in">
          {menuItems.map((item) => (
            <div key={item.labelKey}>
              <a href={item.href} className="block py-2 text-sm font-medium text-foreground" onClick={() => !item.submenu && setMobileOpen(false)}>
                {t(item.labelKey)}
              </a>
              {item.submenu && (
                <div className="pl-4 space-y-1">
                  {item.submenu.map((sub) => (
                    <a key={sub.labelKey} href={sub.href} className="block py-1.5 text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
                      {t(sub.labelKey)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <button onClick={() => setLang("en")} className={`w-9 h-9 rounded-full border border-primary text-xs font-semibold ${lang === "en" ? "bg-primary text-primary-foreground" : "text-primary"}`}>EN</button>
            <button onClick={() => setLang("es")} className={`w-9 h-9 rounded-full border border-primary text-xs font-semibold ${lang === "es" ? "bg-primary text-primary-foreground" : "text-primary"}`}>ES</button>
          </div>
        </div>
      )}
    </nav>
  );
}
