const services = [
  { id: 1, name: "Hair Styling", duration: "1 hr" },
  { id: 2, name: "Wig Installation", duration: "2 hrs" },
  { id: 3, name: "Hair Treatment", duration: "1.5 hrs" },
];

export default function ServiceSelector({ value, onChange }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-cocoa/70">Select Service</p>

      {services.map((service) => (
        <button
          key={service.id}
          type="button"
          onClick={() => onChange(service)}
          className={`w-full rounded-xl p-4 text-left border transition
            ${
              value?.id === service.id
                ? "border-rose-400 bg-rose-400/10"
                : "border-rose-200/30 bg-white/80 backdrop-blur-sm"
            }`}
        >
          <p className="text-cocoa">{service.name}</p>
          <span className="text-xs text-cocoa/70">
            {service.duration}
          </span>
        </button>
      ))}
    </div>
  );
}