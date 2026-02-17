import { TrendingUp, Shield, Users, BarChart3 } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Gestión de Activos",
    description:
      "Administración profesional de portafolios institucionales con enfoque en rendimientos ajustados al riesgo.",
  },
  {
    icon: Shield,
    title: "Control de Riesgos",
    description:
      "Riguroso análisis y monitoreo de riesgos con metodologías probadas a nivel global.",
  },
  {
    icon: Users,
    title: "Fondos de Pensiones",
    description:
      "Gestión especializada de fondos de pensiones gubernamentales e institucionales en Latinoamérica.",
  },
  {
    icon: BarChart3,
    title: "Asesoría Financiera",
    description:
      "Consultoría personalizada para individuos de alto patrimonio y entidades institucionales.",
  },
];

export function ServicesSection() {
  return (
    <section id="servicios" className="py-24 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-foreground mb-4">
          Nuestros <span className="text-primary">Servicios</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
          Soluciones financieras diseñadas para maximizar el valor de su patrimonio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
            >
              <service.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-lg text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
