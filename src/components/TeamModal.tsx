import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users } from "lucide-react";

interface TeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const teamMembers = [
  { nameKey: "team.m1.name", roleKey: "team.m1.role" },
  { nameKey: "team.m2.name", roleKey: "team.m2.role" },
  { nameKey: "team.m3.name", roleKey: "team.m3.role" },
  { nameKey: "team.m4.name", roleKey: "team.m4.role" },
  { nameKey: "team.m5.name", roleKey: "team.m5.role" },
  { nameKey: "team.m6.name", roleKey: "team.m6.role" },
];

export function TeamModal({ open, onOpenChange }: TeamModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-primary flex items-center gap-2">
            <Users className="w-6 h-6" />
            {t("team.title")}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{t("team.subtitle")}</p>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {teamMembers.map((member) => (
            <div
              key={member.nameKey}
              className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {t(member.nameKey).split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{t(member.nameKey)}</h4>
                  <p className="text-xs text-muted-foreground">{t(member.roleKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
