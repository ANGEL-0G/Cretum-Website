import { useState } from "react";
import { GVVModal } from "@/components/GVVModal";
import { MVPModal } from "@/components/MVPModal";
import { TrendratingModal } from "@/components/TrendratingModal";
import { WealthManagementModal } from "@/components/WealthManagementModal";
import { useLanguage } from "@/contexts/LanguageContext";

export function ServicesSection() {
  const [gvvOpen, setGvvOpen] = useState(false);
  const [mvpOpen, setMvpOpen] = useState(false);
  const [trOpen, setTrOpen] = useState(false);
  const [wmOpen, setWmOpen] = useState(false);
  const { t } = useLanguage();

  const services = [
    { title: "GVV", subtitle: "Growth · Value · Volatility", onClick: () => setGvvOpen(true) },
    { title: "MVP Private Equity", subtitle: "", onClick: () => setMvpOpen(true) },
    { title: "Trendrating Licensing", subtitle: "", onClick: () => setTrOpen(true) },
    { title: "Wealth Management", subtitle: "", onClick: () => setWmOpen(true) },
  ];

  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-20 max-w-3xl">
          <em className="text-primary not-italic font-bold">Cretum Partners</em>{" "}
          {t("services.intro")}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              onClick={service.onClick}
              className="bg-primary text-primary-foreground rounded-xl h-[120px] md:h-[200px] p-4 md:p-8 flex flex-col items-center justify-center hover:opacity-90 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg"
            >
              <h3 className="text-sm md:text-3xl font-bold text-center leading-tight w-full">
                <span className="block max-w-[190px] mx-auto">{service.title}</span>
              </h3>
              {service.subtitle && (
                <p className="text-[10px] md:text-sm mt-1 md:mt-3 text-primary-foreground/80 text-center max-w-[190px]">{service.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <GVVModal open={gvvOpen} onOpenChange={setGvvOpen} />
      <MVPModal open={mvpOpen} onOpenChange={setMvpOpen} />
      <TrendratingModal open={trOpen} onOpenChange={setTrOpen} />
      <WealthManagementModal open={wmOpen} onOpenChange={setWmOpen} />
    </section>
  );
}
