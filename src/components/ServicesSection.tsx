import { useState } from "react";
import { GVVModal } from "@/components/GVVModal";
import { MVPModal } from "@/components/MVPModal";

export function ServicesSection() {
  const [gvvOpen, setGvvOpen] = useState(false);
  const [mvpOpen, setMvpOpen] = useState(false);

  const services = [
    { 
      title: "GVV", 
      subtitle: "Growth · Value · Volatility", 
      onClick: () => setGvvOpen(true) 
    },
    { 
      title: "MVP Private Equity", 
      subtitle: "", 
      onClick: () => setMvpOpen(true) 
    },
    { 
      title: "Trendrating Licensing", 
      subtitle: "", 
      onClick: () => {} 
    },
    { 
      title: "Wealth Management", 
      subtitle: "", 
      onClick: () => {} 
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-20 max-w-3xl">
          <em className="text-primary not-italic font-bold">
            Cretum Partners
          </em>{" "}
          ofrece servicios que son las herramientas ideales para alcanzar tus objetivos.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              onClick={service.onClick}
              className="
                bg-primary 
                text-primary-foreground 
                rounded-xl 
                h-[200px]
                p-8 
                flex 
                flex-col 
                items-center 
                justify-center 
                hover:opacity-90 
                transition-all 
                duration-300
                cursor-pointer
                shadow-sm
                hover:shadow-lg
              "
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center leading-tight w-full">
                <span className="block max-w-[190px] mx-auto">
                  {service.title}
                </span>
              </h3>

              {service.subtitle && (
                <p className="text-sm mt-3 text-primary-foreground/80 text-center max-w-[190px]">
                  {service.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <GVVModal open={gvvOpen} onOpenChange={setGvvOpen} />
      <MVPModal open={mvpOpen} onOpenChange={setMvpOpen} />
    </section>
  );
}
