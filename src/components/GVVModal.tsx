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

const strategies = [
  {
    icon: TrendingUp,
    title: "Crecimiento",
    description: "Compañías de tecnología de alto crecimiento.",
  },
  {
    icon: BarChart3,
    title: "Valor",
    description: "Compañías que generen valor a largo plazo.",
  },
  {
    icon: Shield,
    title: "Coberturas de Volatilidad",
    description: "Reducción de riesgo vía Delta Hedging.",
  },
];

interface GVVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GVVModal({ open, onOpenChange }: GVVModalProps) {
  const [chartData, setChartData] = useState<{ month: string; valor: number }[]>([]);
  const [document, setDocument] = useState<{ name: string; file_url: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    fetchData();
  }, [open]);

  const fetchData = async () => {
    setLoading(true);
    const [chartRes, docRes] = await Promise.all([
      supabase
        .from("gvv_chart_data")
        .select("month, month_order, valor")
        .order("month_order", { ascending: true }),
      supabase
        .from("gvv_documents")
        .select("name, file_url")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    if (chartRes.data) setChartData(chartRes.data);
    if (docRes.data) setDocument(docRes.data);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif text-primary">
            Growth, Value and Volatility (GVV)
          </DialogTitle>
          <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mt-1">
            Fondo Multiestratégico · Multidivisas · Valuado en USD
          </p>
        </DialogHeader>

        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          Fondo que invierte en tres estrategias complementarias para maximizar
          rendimientos ajustados al riesgo en mercados globales.
        </p>

        {/* Strategies — small horizontal cards */}
        <div className="flex flex-col sm:flex-row gap-2">
          {strategies.map((s) => (
            <div
              key={s.title}
              className="flex items-center gap-3 bg-secondary/60 border border-border rounded-md px-4 py-3 flex-1"
            >
              <s.icon className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">{s.title}</p>
                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart — main focus */}
        <div>
          <h4 className="font-serif text-lg text-foreground mb-3">
            Valor del Portafolio
          </h4>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    stroke="hsl(215 12% 60%)"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="hsl(215 12% 60%)"
                    domain={["dataMin - 5", "dataMax + 5"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(214 20% 85%)",
                      borderRadius: "6px",
                      fontSize: 13,
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Valor"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="hsl(214 60% 32%)"
                    strokeWidth={2.5}
                    dot={{ fill: "hsl(214 60% 32%)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Philosophy */}
        <div className="bg-primary/5 rounded-lg px-5 py-4 border border-primary/15">
          <p className="text-sm text-foreground leading-relaxed italic">
            Cretum Partners invierte bajo la filosofía de crecimiento e inversión
            a largo plazo, rodeado de confianza, seguridad y transparencia en un
            ambiente protegido. Alcanzamos a ver lo que otros no pueden, esa es
            nuestra ventaja competitiva.
          </p>
        </div>

        {/* Download */}
        {document ? (
          <a
            href={document.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity w-full justify-center"
          >
            <Download className="w-4 h-4" />
            Descargar Carta Mensual de GVV
          </a>
        ) : (
          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-md text-sm font-medium w-full justify-center cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Carta Mensual no disponible aún
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
