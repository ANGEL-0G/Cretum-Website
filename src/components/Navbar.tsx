import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href: string;
  submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { label: "Inicio", href: "#inicio" },
  {
    label: "Servicios",
    href: "#servicios",
    submenu: [
      { label: "Gestión de Activos", href: "#gestion-activos" },
      { label: "Fondos de Pensiones", href: "#fondos-pensiones" },
      { label: "Carteras Institucionales", href: "#carteras" },
      { label: "Asesoría Financiera", href: "#asesoria" },
    ],
  },
  {
    label: "Nuestro Equipo",
    href: "#equipo",
    submenu: [
      { label: "Directivos", href: "#directivos" },
      { label: "Analistas", href: "#analistas" },
      { label: "Carreras", href: "#carreras" },
    ],
  },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-wide text-primary">
              CRETUM
            </span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground -mt-1">
              PARTNERS
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.submenu && handleEnter(item.label)}
              onMouseLeave={handleLeave}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground border border-border rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                {item.label}
                {item.submenu && <ChevronDown className="w-3 h-3" />}
              </a>

              {/* Dropdown */}
              {item.submenu && openMenu === item.label && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-md shadow-lg py-1 animate-fade-in">
                  {item.submenu.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Language Toggle */}
        <div className="hidden md:flex items-center gap-2">
          <button className="w-9 h-9 rounded-full border border-primary text-primary text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
            EN
          </button>
          <button className="w-9 h-9 rounded-full border border-primary bg-primary text-primary-foreground text-xs font-semibold">
            ES
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 space-y-2 animate-fade-in">
          {menuItems.map((item) => (
            <div key={item.label}>
              <a
                href={item.href}
                className="block py-2 text-sm font-medium text-foreground"
                onClick={() => !item.submenu && setMobileOpen(false)}
              >
                {item.label}
              </a>
              {item.submenu && (
                <div className="pl-4 space-y-1">
                  {item.submenu.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <button className="w-9 h-9 rounded-full border border-primary text-primary text-xs font-semibold">EN</button>
            <button className="w-9 h-9 rounded-full border border-primary bg-primary text-primary-foreground text-xs font-semibold">ES</button>
          </div>
        </div>
      )}
    </nav>
  );
}
