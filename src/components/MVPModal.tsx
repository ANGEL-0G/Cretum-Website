import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Globe, FileText, TrendingUp } from "lucide-react";

const companies = [
  {
    name: "Airbnb",
    logo: "https://logo.clearbit.com/airbnb.com",
  },
  {
    name: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com",
  },
  {
    name: "Coinbase",
    logo: "https://logo.clearbit.com/coinbase.com",
  },
  {
    name: "SpaceX",
    logo: "https://logo.clearbit.com/spacex.com",
  },
  {
    name: "Rappi",
    logo: "https://logo.clearbit.com/rappi.com",
  },
];

const highlights = [
  {
    icon: Building2,
    text: "Regulado por FINRA y SEC",
  },
  {
    icon: Globe,
    text: "+10 ciudades alrededor del mundo",
  },
  {
    icon: TrendingUp,
    text: "Estrategia Pre-IPO secundaria",
  },
  {
    icon: FileText,
    text: "Informe mensual: Venture Bytes",
  },
];

interface MVPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MVPModal({ open, onOpenChange }: MVPModalProps) {
  // Duplicate for seamless loop
  const allCompanies = [...companies, ...companies];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif text-primary">
            Manhattan Venture Partners
          </DialogTitle>
          <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mt-1">
            Tomorrow's IPOs · Today
          </p>
        </DialogHeader>

        {/* Main description */}
        <p className="text-sm text-foreground leading-relaxed">
          Es una firma que invierte en empresas privadas dentro del sector de
          tecnología. MVP es regulado por <strong>FINRA</strong> y{" "}
          <strong>SEC</strong>. La tesis de MVP se enfoca en invertir en
          empresas privadas en etapa <strong>PRE-IPO</strong> con una
          estrategia secundaria.
        </p>

        {/* Highlights — small horizontal cards */}
        <div className="grid grid-cols-2 gap-2">
          {highlights.map((h) => (
            <div
              key={h.text}
              className="flex items-center gap-3 bg-secondary/60 border border-border rounded-md px-4 py-3"
            >
              <h.icon className="w-4 h-4 text-primary shrink-0" />
              <p className="text-xs font-medium text-foreground leading-tight">
                {h.text}
              </p>
            </div>
          ))}
        </div>

        {/* Locations */}
        <div className="bg-primary/5 rounded-lg px-5 py-4 border border-primary/15 space-y-2">
          <p className="text-sm text-foreground leading-relaxed">
            Los headquarters se encuentran en{" "}
            <strong>Nueva York y San Francisco</strong>; también contamos con
            una presencia en <strong>+10 ciudades</strong> alrededor del mundo.
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            MVP cuenta con un departamento de análisis, ayudando a reducir la
            asimetría de mercados privados. A través de su informe mensual,{" "}
            <em>Venture Bytes</em>, destaca las tendencias actuales y las
            oportunidades emergentes en el panorama tecnológico global.
          </p>
        </div>

        {/* Portfolio companies */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-4">
            Empresas en portafolio — invirtiendo siempre en etapa privada
          </p>

          {/* Marquee carousel */}
          <div className="overflow-hidden rounded-md border border-border bg-secondary/30 py-4">
            <div className="flex animate-marquee gap-10 w-max">
              {allCompanies.map((company, i) => (
                <div
                  key={`${company.name}-${i}`}
                  className="flex flex-col items-center gap-2 shrink-0 w-24"
                >
                  <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center overflow-hidden shadow-sm">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = "none";
                        const parent = t.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-xs font-bold text-primary">${company.name.slice(0, 2).toUpperCase()}</span>`;
                        }
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
