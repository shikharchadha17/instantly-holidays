import Link from "next/link";
import Image from "next/image";
import { Destination, formatINR } from "@/data/destinations";
import VisaBadge from "./VisaBadge";

const styleColors: Record<string, string> = {
  "Romantic": "bg-pink-100 text-pink-700",
  "Hidden Gems": "bg-purple-100 text-purple-700",
  "Adventure": "bg-orange-100 text-orange-700",
  "Heritage & Art": "bg-blue-100 text-blue-700",
};

export default function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Link href={`/explore/combos/${dest.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Photo */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
        <div className="absolute top-3 left-3">
          <VisaBadge visa={dest.visa} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {dest.styles.map((s) => (
            <span key={s} className={`text-xs px-2 py-0.5 rounded-full font-medium ${styleColors[s] ?? "bg-gray-100 text-gray-600"}`}>
              {s}
            </span>
          ))}
        </div>
        <h3 className="font-bold text-gray-900 text-lg leading-tight">{dest.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{dest.duration}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">Total Price</span>
            <p className="font-bold text-gray-900">{formatINR(dest.pricePerPerson)} <span className="font-normal text-sm text-gray-500">/ person</span></p>
          </div>
          <button className="flex items-center gap-1 border border-blue-700 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 hover:text-white transition-colors">
            Explore Trip
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
