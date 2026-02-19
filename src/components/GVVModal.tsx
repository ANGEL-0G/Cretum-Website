import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrendingUp, Shield, BarChart3, Download, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface GVVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GVVModal({ open, onOpenChange }: GVVModalProps) {
  const [chartData, setChartData] = useState<{ month: string; valor: number }[]>([]);
  const [document, setDocument] = useState<{ name: string; file_url: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const strategies = [
    { icon: TrendingUp, titleKey: "gvv.growth", descKey: "gvv.growth.desc" },
    { icon: BarChart3, titleKey: "gvv.value", descKey: "gvv.value.desc" },
    { icon: Shield, titleKey: "gvv.hedge", descKey: "gvv.hedge.desc" },
  ];

  useEffect(() => {
    if (!open) return;
    fetchData();
  }, [open]);

  const fetchData = async () => {
    setLoading(true);
    const [chartRes, docRes] = await Promise.all([
      supabase.from("gvv_chart_data").select("month, month_order, valor").order("month_order", { ascending: true }),
      supabase.from("gvv_documents").select("name, file_url").order("created_at", { ascending: false }).limit(1).maybeSingle(),
    ]);
    if (chartRes.data) setChartData(chartRes.data);
    if (docRes.data) setDocument(docRes.data);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif text-primary">{t("gvv.title")}</DialogTitle>
          <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mt-1">{t("gvv.subtitle")}</p>
        </DialogHeader>

        <p className="text-sm text-muted-foreground leading-relaxed mt-1">{t("gvv.desc")}</p>

        <div className="flex flex-col sm:flex-row gap-2">
          {strategies.map((s) => (
            <div key={s.titleKey} className="flex items-center gap-3 bg-secondary/60 border border-border rounded-md px-4 py-3 flex-1">
              <s.icon className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">{t(s.titleKey)}</p>
                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{t(s.descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-serif text-lg text-foreground mb-3">{t("gvv.chart.title")}</h4>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215 12% 60%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 12% 60%)" domain={["dataMin - 5", "dataMax + 5"]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(214 20% 85%)", borderRadius: "6px", fontSize: 13 }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, t("gvv.chart.label")]}
                  />
                  <Line type="monotone" dataKey="valor" stroke="hsl(214 60% 32%)" strokeWidth={2.5} dot={{ fill: "hsl(214 60% 32%)", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-primary/5 rounded-lg px-5 py-4 border border-primary/15">
          <p className="text-sm text-foreground leading-relaxed italic">{t("gvv.philosophy")}</p>
        </div>

        {document ? (
          <a href={document.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity w-full justify-center">
            <Download className="w-4 h-4" />
            {t("gvv.download")}
          </a>
        ) : (
          <button disabled className="flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-md text-sm font-medium w-full justify-center cursor-not-allowed">
            <Download className="w-4 h-4" />
            {t("gvv.noDoc")}
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
