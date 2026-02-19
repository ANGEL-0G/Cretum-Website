import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Globe, FileText, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const companies = [
  { name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com" },
  { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com" },
  { name: "Coinbase", logo: "https://logo.clearbit.com/coinbase.com" },
  { name: "SpaceX", logo: "https://logo.clearbit.com/spacex.com" },
  { name: "Rappi", logo: "https://logo.clearbit.com/rappi.com" },
];

interface MVPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MVPModal({ open, onOpenChange }: MVPModalProps) {
  const allCompanies = [...companies, ...companies];
  const { t } = useLanguage();

  const highlights = [
    { icon: Building2, textKey: "mvp.h1" },
    { icon: Globe, textKey: "mvp.h2" },
    { icon: TrendingUp, textKey: "mvp.h3" },
    { icon: FileText, textKey: "mvp.h4" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl font-serif text-primary">{t("mvp.title")}</DialogTitle>
          <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">{t("mvp.subtitle")}</p>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <p className="text-sm text-foreground leading-relaxed">{t("mvp.desc")}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {highlights.map((h) => (
            <div key={h.textKey} className="flex items-center gap-3 bg-secondary/60 border border-border rounded-md px-4 py-3">
              <h.icon className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs font-medium text-foreground">{t(h.textKey)}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-lg px-5 py-4 border border-primary/15 mt-6 space-y-3">
          <p className="text-sm text-foreground leading-relaxed">{t("mvp.hq")}</p>
          <p className="text-sm text-foreground leading-relaxed">{t("mvp.analysis")}</p>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold text-foreground mb-4">{t("mvp.portfolio")}</p>
          <div className="overflow-hidden rounded-lg border border-border bg-secondary/30 py-5">
            <div className="flex animate-marquee gap-12 w-max">
              {allCompanies.map((company, i) => (
                <div key={`${company.name}-${i}`} className="flex flex-col items-center gap-2 shrink-0 w-24">
                  <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center overflow-hidden shadow-sm">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = "none";
                        if (el.parentElement) {
                          el.parentElement.innerHTML = `<span class="text-xs font-bold text-primary">${company.name.slice(0, 2).toUpperCase()}</span>`;
                        }
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
