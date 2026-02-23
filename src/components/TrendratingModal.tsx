import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BarChart3, Search, History, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TrendratingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TrendratingModal({ open, onOpenChange }: TrendratingModalProps) {
  const { t } = useLanguage();

  const highlights = [
    { icon: TrendingUp, textKey: "tr.h1" },
    { icon: Search, textKey: "tr.h2" },
    { icon: History, textKey: "tr.h3" },
    { icon: BarChart3, textKey: "tr.h4" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="w-full min-w-0">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-serif text-primary">{t("tr.title")}</DialogTitle>
            <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">{t("tr.subtitle")}</p>
          </DialogHeader>

          <div className="mt-4">
            <p className="text-sm text-foreground leading-relaxed break-words">{t("tr.desc")}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-6">
            {highlights.map((h) => (
              <div key={h.textKey} className="flex items-center gap-2 bg-secondary/60 border border-border rounded-md p-2.5 min-w-0">
                <h.icon className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[10px] font-medium text-foreground leading-tight break-words overflow-hidden min-w-0">{t(h.textKey)}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-lg px-4 py-3 border border-primary/15 mt-6 space-y-2">
            <p className="text-xs text-foreground leading-relaxed break-words overflow-hidden">{t("tr.algo")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
