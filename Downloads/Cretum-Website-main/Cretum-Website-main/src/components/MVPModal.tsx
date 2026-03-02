import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Globe, FileText, TrendingUp } from "lucide-react"; // O lucide-react según tu config
import { useLanguage } from "@/contexts/LanguageContext";

const CompanyLogos = () => {
  const companies = [
    { name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com" },
    { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com" }, // Nota: Corregí la URL para que funcione mejor
    { name: "Coinbase", logo: "https://logo.clearbit.com/coinbase.com" },
    { name: "SpaceX", logo: "https://logo.clearbit.com/spacex.com" },
    { name: "Rappi", logo: "https://logo.clearbit.com/rappi.com" },
  ];

  return (
    <div className="flex flex-wrap gap-8 items-center justify-center p-8">
      {companies.map((company) => (
        <div key={company.name} className="flex flex-col items-center gap-2">
          <img 
            src={company.logo} 
            alt={`${company.name} logo`} 
            className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
            onError={(e) => {
              // Por si falla el logo, mostramos el nombre como respaldo
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-sm text-gray-500">{company.name}</span>
        </div>
      ))}
    </div>
  );
};

interface MVPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MVPModal({ open, onOpenChange }: MVPModalProps) {
  const allCompanies = [...companies, ...companies, ...companies]; // Más copias para un scroll infinito suave
  const { t } = useLanguage();

  const highlights = [
    { icon: Building2, textKey: "mvp.h1" },
    { icon: Globe, textKey: "mvp.h2" },
    { icon: TrendingUp, textKey: "mvp.h3" },
    { icon: FileText, textKey: "mvp.h4" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Ajustamos el max-h y eliminamos el padding excesivo */}
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-6 md:p-8">
        
        <DialogHeader className="space-y-1 mb-4">
          <DialogTitle className="text-2xl md:text-3xl font-serif text-primary leading-tight">
            {t("mvp.title")}
          </DialogTitle>
          <p className="text-[10px] md:text-xs font-bold text-muted-foreground tracking-[0.2em] uppercase">
            {t("mvp.subtitle")}
          </p>
        </DialogHeader>

        {/* Layout de dos columnas para optimizar espacio vertical */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Columna Izquierda: Descripción Principal */}
          <div className="md:col-span-7 space-y-4">
            <p className="text-sm text-foreground leading-relaxed text-pretty">
              {t("mvp.desc")}
            </p>
            
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10 space-y-3">
              <p className="text-[13px] text-foreground/90 leading-snug italic">
                {t("mvp.hq")}
              </p>
              <p className="text-[13px] text-foreground/90 leading-snug">
                {t("mvp.analysis")}
              </p>
            </div>
          </div>

          {/* Columna Derecha: Highlights/Beneficios en Grid 2x2 */}
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div 
                  key={h.textKey} 
                  className="flex flex-col items-center text-center p-3 bg-secondary/30 border border-border/50 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <h.icon className="w-5 h-5 text-primary mb-2 shrink-0" />
                  <p className="text-[10px] font-semibold text-foreground leading-tight">
                    {t(h.textKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección de Portafolio (Footer del modal) */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
            {t("mvp.portfolio")}
          </p>
          
          <div className="relative overflow-hidden rounded-xl bg-secondary/20 py-4 border border-border/40">
            {/* Gradientes laterales para suavizar el scroll del marquee */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-secondary/20 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-secondary/20 to-transparent z-10" />
            
            <div className="flex animate-marquee gap-10 w-max px-4">
              {allCompanies.map((company, i) => (
                <div key={`${company.name}-${i}`} className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center p-1.5 shadow-sm">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all"
                      onError={(e) => {
                        const el = e.currentTarget;
                        if (el.parentElement) {
                          el.parentElement.innerHTML = `<span class="text-[10px] font-bold text-primary">${company.name.slice(0, 2)}</span>`;
                        }
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}