import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, Lightbulb, Shield, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WealthManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WealthManagementModal({ open, onOpenChange }: WealthManagementModalProps) {
  const { t } = useLanguage();

  const highlights = [
    { icon: Heart, textKey: "wm.h1" },
    { icon: Lightbulb, textKey: "wm.h2" },
    { icon: Shield, textKey: "wm.h3" },
    { icon: Users, textKey: "wm.h4" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="w-full min-w-0">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-serif text-primary">{t("wm.title")}</DialogTitle>
            <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">{t("wm.subtitle")}</p>
          </DialogHeader>

          <div className="mt-4">
            <p className="text-sm text-foreground leading-relaxed break-words">{t("wm.desc1")}</p>
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
            <p className="text-xs text-foreground leading-relaxed break-words overflow-hidden">{t("wm.desc2")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
