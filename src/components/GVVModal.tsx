import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrendingUp, Shield, BarChart3, Download } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const portfolioData = [
  { month: "Ene", valor: 100 },
  { month: "Feb", valor: 102.5 },
  { month: "Mar", valor: 105.1 },
  { month: "Abr", valor: 103.8 },
  { month: "May", valor: 107.2 },
  { month: "Jun", valor: 110.5 },
  { month: "Jul", valor: 112.3 },
  { month: "Ago", valor: 109.8 },
  { month: "Sep", valor: 114.1 },
  { month: "Oct", valor: 117.6 },
  { month: "Nov", valor: 120.2 },
  { month: "Dic", valor: 123.5 },
];

const strategies = [
  {
    icon: TrendingUp,
    title: "Crecimiento",
    description:
      "Enfocada en compañías de tecnología de alto crecimiento.",
  },
  {
    icon: BarChart3,
    title: "Valor",
    description:
      "Enfocadas en compañías que generen valor a largo plazo.",
  },
  {
    icon: Shield,
    title: "Coberturas de Volatilidad",
    description:
      "Busca reducir el riesgo a través de Delta Hedging.",
  },
];

interface GVVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GVVModal({ open, onOpenChange }: GVVModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif text-primary">
            Growth, Value and Volatility (GVV)
          </DialogTitle>
          <p className="text-sm font-semibold text-muted-foreground tracking-wide">
            Fondo Multiestratégico
          </p>
        </DialogHeader>

        {/* Description */}
        <div className="mt-4 space-y-4">
          <p className="text-sm text-foreground leading-relaxed">
            Es un fondo multidivisas y multiestratégias valuado en USD que
            invierte en tres distintas estrategias.
          </p>

          {/* Strategies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategies.map((s) => (
              <div
                key={s.title}
                className="bg-secondary/50 rounded-lg p-4 border border-border"
              >
                <s.icon className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {s.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {/* Philosophy */}
          <div className="bg-primary/5 rounded-lg p-5 border border-primary/20">
            <p className="text-sm text-foreground leading-relaxed italic">
              Cretum Partners invierte bajo la filosofía de crecimiento e
              inversión a largo plazo, rodeado de confianza, seguridad y
              transparencia en un ambiente protegido. Alcanzamos a ver lo que
              otros no pueden, esa es nuestra ventaja competitiva.
            </p>
          </div>

          {/* Chart */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">
              Valor del Portafolio
            </h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(214 20% 85%)"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    stroke="hsl(215 12% 50%)"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="hsl(215 12% 50%)"
                    domain={["dataMin - 5", "dataMax + 5"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(214 20% 85%)",
                      borderRadius: "6px",
                      fontSize: 13,
                    }}
                    formatter={(value: number) => [
                      `$${value.toFixed(1)}`,
                      "Valor",
                    ]}
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
          </div>

          {/* Download Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity w-full justify-center">
            <Download className="w-4 h-4" />
            Descargar Carta Mensual de GVV
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
