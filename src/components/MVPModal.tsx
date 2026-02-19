import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Globe, FileText, TrendingUp } from "lucide-react";

const companies = [
  { name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com" },
  { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com" },
  { name: "Coinbase", logo: "https://logo.clearbit.com/coinbase.com" },
  { name: "SpaceX", logo: "https://logo.clearbit.com/spacex.com" },
  { name: "Rappi", logo: "https://logo.clearbit.com/rappi.com" },
];

const highlights = [
  { icon: Building2, text: "Regulado por FINRA y SEC" },
  { icon: Globe, text: "+10 ciudades alrededor del mundo" },
  { icon: TrendingUp, text: "Estrategia Pre-IPO secundaria" },
  { icon: FileText, text: "Informe mensual: Venture Bytes" },
];

interface MVPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MVPModal({ open, onOpenChange }: MVPModalProps) {
  const allCompanies = [...companies, ...companies];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-y-auto p-8">
        
        {/* Header */}
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-4xl font-serif text-primary">
            Manhattan Venture Partners
          </DialogTitle>
          <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">
            Tomorrow's IPOs · Today
          </p>
        </DialogHeader>

        {/* Main Description */}
        <div className="mt-6 space-y-4">
          <p className="text-base text-foreground leading-relaxed">
            Es una firma que invierte en empresas privadas dentro del sector de
            tecnología. MVP es regulado por <strong>FINRA</strong> y{" "}
            <strong>SEC</strong>. La tesis de inversión se enfoca en compañías
            en etapa <strong>PRE-IPO</strong> mediante una estrategia secundaria.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {highlights.map((h) => (
            <div
              key={h.text}
              className="flex items-center gap-4 bg-secondary/60 border border-border rounded-lg px-5 py-4"
            >
              <h.icon className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm font-medium text-foreground">
                {h.text}
              </p>
            </div>
          ))}
        </div>

        {/* Institutional Block */}
        <div className="bg-primary/5 rounded-xl px-6 py-6 border border-primary/15 mt-8 space-y-4">
          <p className="text-base text-foreground leading-relaxed">
            Los headquarters se encuentran en{" "}
            <strong>Nueva York y San Francisco</strong>; también contamos con
            presencia en <strong>+10 ciudades</strong> alrededor del mundo.
          </p>
          <p className="text-base text-foreground leading-relaxed">
            MVP cuenta con un departamento de análisis que reduce la asimetría
            de mercados privados. A través de su informe mensual,{" "}
            <em>Venture Bytes</em>, se destacan tendencias y oportunidades
            emergentes en el panorama tecnológico global.
          </p>
        </div>

        {/* Portfolio */}
        <div className="mt-10">
          <p className="text-base font-semibold text-foreground mb-6">
            Empresas en portafolio — invirtiendo siempre en etapa privada
          </p>

          <div className="overflow-hidden rounded-lg border border-border bg-secondary/30 py-6">
            <div className="flex animate-marquee gap-12 w-max">
              {allCompanies.map((company, i) => (
                <div
                  key={`${company.name}-${i}`}
                  className="flex flex-col items-center gap-3 shrink-0 w-28"
                >
                  <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center overflow-hidden shadow-sm">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = "none";
                        const parent = t.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-sm font-bold text-primary">${company.name.slice(0, 2).toUpperCase()}</span>`;
                        }
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground text-center">
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
