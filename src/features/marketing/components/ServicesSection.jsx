import { services } from "@/src/features/marketing/content";

export function ServicesSection({ activeService, selectedService, onServiceSelect }) {
  return (
    <section className="servicesSection" id="services">
      <div className="sectionIntro">
        <p className="sectionLabel">Hizmetler</p>
        <p>
          Bestform'un açık profilinde verdiği hizmet çerçevesi net: body building, fitness, pilates ve personal
          training.
        </p>
      </div>

      <div className="servicePicker" role="tablist" aria-label="Hizmet seçimi">
        {services.map((service, index) => (
          <button
            key={service.label}
            type="button"
            className={activeService === index ? "isActive" : ""}
            onClick={() => onServiceSelect(index)}
          >
            {service.label}
          </button>
        ))}
      </div>

      <div className="servicePanel">
        <div>
          <span>{selectedService.label}</span>
          <h3>{selectedService.title}</h3>
          <p>{selectedService.text}</p>
        </div>
        <ul>
          {selectedService.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
