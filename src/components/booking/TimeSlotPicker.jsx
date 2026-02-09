const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

export default function TimeSlotPicker({ value, onChange }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-cocoa/70">Select Time</p>

      <div className="grid grid-cols-3 gap-3">
        {timeSlots.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => onChange(time)}
            className={`rounded-lg py-2 text-sm transition
              ${
                value === time
                  ? "bg-rose-400 text-white"
                  : "bg-white/80 backdrop-blur-sm text-cocoa border border-rose-200/30"
              }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}