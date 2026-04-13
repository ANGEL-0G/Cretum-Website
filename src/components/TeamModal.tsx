import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const teamMembers = [
  { id: "m1", nameKey: "team.m1.name", roleKey: "team.m1.role", bioKey: "team.m1.bio", photo: "" },
  { id: "m2", nameKey: "team.m2.name", roleKey: "team.m2.role", bioKey: "team.m2.bio", photo: "" },
  { id: "m3", nameKey: "team.m3.name", roleKey: "team.m3.role", bioKey: "team.m3.bio", photo: "" },
  { id: "m4", nameKey: "team.m4.name", roleKey: "team.m4.role", bioKey: "team.m4.bio", photo: "" },
  { id: "m5", nameKey: "team.m5.name", roleKey: "team.m5.role", bioKey: "team.m5.bio", photo: "" },
  { id: "m6", nameKey: "team.m6.name", roleKey: "team.m6.role", bioKey: "team.m6.bio", photo: "" },
];

export function TeamModal({ open, onOpenChange }: TeamModalProps) {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const selected = teamMembers.find((m) => m.id === selectedMember);

  return (
    <>
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
              <button
                key={member.id}
                onClick={() => setSelectedMember(member.id)}
                className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    {member.photo && <AvatarImage src={member.photo} alt={t(member.nameKey)} />}
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                      {t(member.nameKey).split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{t(member.nameKey)}</h4>
                    <p className="text-xs text-muted-foreground/70">{t(member.roleKey)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Member detail modal */}
      <Dialog open={!!selectedMember} onOpenChange={(v) => !v && setSelectedMember(null)}>
        <DialogContent className="max-w-md w-[calc(100vw-2rem)]">
          {selected && (
            <div className="flex flex-col items-center text-center pt-2">
              <Avatar className="w-24 h-24 mb-4">
                {selected.photo && <AvatarImage src={selected.photo} alt={t(selected.nameKey)} />}
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                  {t(selected.nameKey).split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold text-foreground">{t(selected.nameKey)}</h3>
              <p className="text-sm text-muted-foreground/60 mb-4">{t(selected.roleKey)}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(selected.bioKey)}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
