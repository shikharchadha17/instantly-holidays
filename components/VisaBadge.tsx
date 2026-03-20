import { VisaType } from "@/data/destinations";

const config: Record<VisaType, { bg: string; text: string; label: string }> = {
  free: { bg: "bg-green-500", text: "text-white", label: "Visa: Free" },
  easy: { bg: "bg-pink-500", text: "text-white", label: "Visa: Easy" },
  standard: { bg: "bg-orange-500", text: "text-white", label: "Visa: Standard" },
};

export default function VisaBadge({ visa }: { visa: VisaType }) {
  const c = config[visa];
  return (
    <span className={`${c.bg} ${c.text} text-xs font-semibold px-2 py-0.5 rounded-full`}>
      {c.label}
    </span>
  );
}
