export function ServicesSection() {
  const services = [
    { title: "GVV", subtitle: "Growth · Value · Volatility" },
    { title: "MVP Private Equitity", subtitle: "" },
    { title: "Trendrating Liscencing", subtitle: "" },
    { title: "Wealth Managment", subtitle: "" },
  ];

  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-serif text-foreground mb-20 max-w-3xl">
          <em className="text-primary not-italic font-bold">Cretum Partners</em>{" "}
          ofrece servicios que son las herramientas ideales para alcanzar tus objetivos.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col items-center justify-center min-h-[180px] hover:opacity-90 transition-opacity cursor-pointer"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center leading-tight">
                {service.title}
              </h3>
              {service.subtitle && (
                <p className="text-sm mt-2 text-primary-foreground/80 text-center">
                  {service.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
