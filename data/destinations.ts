export type VisaType = "free" | "easy" | "standard";
export type TravelStyle = "Romantic" | "Hidden Gems" | "Adventure" | "Heritage & Art";

export interface Destination {
  slug: string;
  name: string;
  visa: VisaType;
  visaLabel: string;
  duration: string;
  styles: TravelStyle[];
  pricePerPerson: number;
  description: string;
  lat: number;
  lng: number;
  image: string;
  weather: string;
  budgetPrice: number;
  midPrice: number;
  premiumPrice: number;
  budgetBreakdown: { flights: number; stays: number; visa: number };
  midBreakdown: { flights: number; stays: number; visa: number };
  premiumBreakdown: { flights: number; stays: number; visa: number };
}

export const destinations: Destination[] = [
  {
    slug: "goa",
    name: "Goa",
    visa: "free",
    visaLabel: "Visa: Free",
    duration: "For 5–7 days",
    styles: ["Romantic", "Hidden Gems"],
    pricePerPerson: 125000,
    description: "Goa's golden beaches, Portuguese heritage, and vibrant nightlife make it India's most beloved coastal escape. From tranquil Palolem to bustling Baga, every stretch of shore offers its own magic.",
    lat: 15.2993,
    lng: 74.1240,
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=800&q=80",
    weather: "Beach Weather",
    budgetPrice: 35000,
    midPrice: 60000,
    premiumPrice: 95000,
    budgetBreakdown: { flights: 8000, stays: 20000, visa: 0 },
    midBreakdown: { flights: 12000, stays: 38000, visa: 0 },
    premiumBreakdown: { flights: 18000, stays: 62000, visa: 0 },
  },
  {
    slug: "thailand",
    name: "Thailand",
    visa: "easy",
    visaLabel: "Visa: Easy",
    duration: "For 5–7 days",
    styles: ["Romantic", "Hidden Gems"],
    pricePerPerson: 125000,
    description: "Thailand, known for its stunning beaches and rich cultural heritage, is a Southeast Asian gem. With vibrant cities like Bangkok and serene islands such as Phuket, it offers a unique blend of modernity and tradition. The country is famous for its delicious cuisine, bustling markets, and warm hospitality.",
    lat: 15.8700,
    lng: 100.9925,
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    weather: "Warm & Sunny (25–35°C)",
    budgetPrice: 60000,
    midPrice: 90000,
    premiumPrice: 125000,
    budgetBreakdown: { flights: 20000, stays: 30000, visa: 10000 },
    midBreakdown: { flights: 30000, stays: 50000, visa: 10000 },
    premiumBreakdown: { flights: 50000, stays: 50000, visa: 25000 },
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    visa: "standard",
    visaLabel: "Visa: Standard",
    duration: "For 5–7 days",
    styles: ["Adventure", "Heritage & Art"],
    pricePerPerson: 125000,
    description: "Vietnam captivates with its dramatic landscapes, ancient temples, and world-famous cuisine. From Halong Bay's emerald waters to Hoi An's lantern-lit streets, every corner tells a story.",
    lat: 14.0583,
    lng: 108.2772,
    image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80",
    weather: "Mild & Pleasant (18–25°C)",
    budgetPrice: 55000,
    midPrice: 85000,
    premiumPrice: 120000,
    budgetBreakdown: { flights: 22000, stays: 23000, visa: 10000 },
    midBreakdown: { flights: 32000, stays: 43000, visa: 10000 },
    premiumBreakdown: { flights: 48000, stays: 47000, visa: 25000 },
  },
  {
    slug: "srilanka",
    name: "SriLanka",
    visa: "easy",
    visaLabel: "Visa: Easy",
    duration: "For 5–7 days",
    styles: ["Hidden Gems"],
    pricePerPerson: 125000,
    description: "Sri Lanka enchants with ancient ruins, misty hill country, and pristine beaches. The teardrop isle packs temples, wildlife, and colonial charm into a compact paradise.",
    lat: 7.8731,
    lng: 80.7718,
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80",
    weather: "Warm & Sunny (25–35°C)",
    budgetPrice: 50000,
    midPrice: 80000,
    premiumPrice: 115000,
    budgetBreakdown: { flights: 18000, stays: 25000, visa: 7000 },
    midBreakdown: { flights: 28000, stays: 45000, visa: 7000 },
    premiumBreakdown: { flights: 45000, stays: 55000, visa: 15000 },
  },
  {
    slug: "dubai",
    name: "Dubai",
    visa: "easy",
    visaLabel: "Visa: Easy",
    duration: "For 5–7 days",
    styles: ["Romantic", "Hidden Gems"],
    pricePerPerson: 125000,
    description: "Dubai dazzles with record-breaking skyscrapers, golden desert dunes, and world-class dining. This city of superlatives seamlessly blends futuristic ambition with Arabian tradition.",
    lat: 25.2048,
    lng: 55.2708,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    weather: "Warm & Sunny (25–35°C)",
    budgetPrice: 65000,
    midPrice: 100000,
    premiumPrice: 145000,
    budgetBreakdown: { flights: 20000, stays: 35000, visa: 10000 },
    midBreakdown: { flights: 30000, stays: 60000, visa: 10000 },
    premiumBreakdown: { flights: 50000, stays: 80000, visa: 15000 },
  },
  {
    slug: "bali",
    name: "Bali",
    visa: "standard",
    visaLabel: "Visa: Standard",
    duration: "For 5–7 days",
    styles: ["Adventure", "Heritage & Art"],
    pricePerPerson: 125000,
    description: "Bali's emerald rice terraces, ancient Hindu temples, and surf-kissed shores create an island of unparalleled beauty. The Island of Gods rewards every traveller with spiritual peace and natural wonder.",
    lat: -8.3405,
    lng: 115.0920,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    weather: "Warm & Sunny (25–35°C)",
    budgetPrice: 58000,
    midPrice: 88000,
    premiumPrice: 125000,
    budgetBreakdown: { flights: 22000, stays: 26000, visa: 10000 },
    midBreakdown: { flights: 32000, stays: 46000, visa: 10000 },
    premiumBreakdown: { flights: 50000, stays: 50000, visa: 25000 },
  },
  {
    slug: "singapore",
    name: "Singapore",
    visa: "free",
    visaLabel: "Visa: Free",
    duration: "For 5–7 days",
    styles: ["Romantic", "Heritage & Art"],
    pricePerPerson: 130000,
    description: "Singapore is a dazzling city-state where futuristic gardens meet colonial heritage and world-class food. From Marina Bay's glittering skyline to the hawker centres of Chinatown, it's Asia distilled.",
    lat: 1.3521,
    lng: 103.8198,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    weather: "Warm & Sunny (25–35°C)",
    budgetPrice: 70000,
    midPrice: 105000,
    premiumPrice: 150000,
    budgetBreakdown: { flights: 25000, stays: 40000, visa: 0 },
    midBreakdown: { flights: 35000, stays: 65000, visa: 0 },
    premiumBreakdown: { flights: 55000, stays: 90000, visa: 0 },
  },
  {
    slug: "paris",
    name: "Paris",
    visa: "standard",
    visaLabel: "Visa: Standard",
    duration: "For 5–7 days",
    styles: ["Romantic", "Heritage & Art"],
    pricePerPerson: 160000,
    description: "Paris, the City of Light, weaves romance, art, and gastronomy into every cobblestone street. The Eiffel Tower, the Louvre, and the Seine—Paris is a living masterpiece.",
    lat: 48.8566,
    lng: 2.3522,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    weather: "Mild & Pleasant (18–25°C)",
    budgetPrice: 80000,
    midPrice: 120000,
    premiumPrice: 180000,
    budgetBreakdown: { flights: 35000, stays: 30000, visa: 15000 },
    midBreakdown: { flights: 45000, stays: 60000, visa: 15000 },
    premiumBreakdown: { flights: 70000, stays: 95000, visa: 15000 },
  },
  {
    slug: "japan",
    name: "Japan",
    visa: "easy",
    visaLabel: "Visa: Easy",
    duration: "For 7–10 days",
    styles: ["Heritage & Art", "Adventure"],
    pricePerPerson: 175000,
    description: "Japan's harmony of ancient temples and neon-lit cities, cherry blossoms and bullet trains, makes it the world's most captivating cultural destination.",
    lat: 36.2048,
    lng: 138.2529,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    weather: "Mild & Pleasant (18–25°C)",
    budgetPrice: 90000,
    midPrice: 135000,
    premiumPrice: 200000,
    budgetBreakdown: { flights: 40000, stays: 40000, visa: 10000 },
    midBreakdown: { flights: 55000, stays: 70000, visa: 10000 },
    premiumBreakdown: { flights: 80000, stays: 100000, visa: 20000 },
  },
  {
    slug: "maldives",
    name: "Maldives",
    visa: "free",
    visaLabel: "Visa: Free",
    duration: "For 5–7 days",
    styles: ["Romantic", "Hidden Gems"],
    pricePerPerson: 105000,
    description: "The Maldives offers the world's most extraordinary ocean escape — overwater bungalows above turquoise lagoons, vibrant coral reefs, and absolute serenity.",
    lat: 3.2028,
    lng: 73.2207,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    weather: "Beach Weather",
    budgetPrice: 75000,
    midPrice: 105000,
    premiumPrice: 160000,
    budgetBreakdown: { flights: 30000, stays: 42000, visa: 0 },
    midBreakdown: { flights: 40000, stays: 62000, visa: 0 },
    premiumBreakdown: { flights: 60000, stays: 98000, visa: 0 },
  },
];

export const weekendEscapes = [
  {
    name: "Goa",
    tag: "Under ₹10k",
    duration: "3D/2N",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600&q=80",
    slug: "goa",
  },
  {
    name: "Manali",
    tag: "Under ₹20k",
    duration: "3D/2N",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    slug: "manali",
  },
  {
    name: "Rishikesh",
    tag: "Under ₹20k",
    duration: "3D/2N",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    slug: "rishikesh",
  },
];

export const trendingDestinations = [
  {
    name: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80",
    slug: "japan",
  },
  {
    name: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80",
    slug: "paris",
  },
  {
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80",
    slug: "maldives",
  },
];

export const visaFreeGetaways = [
  {
    name: "Maldives",
    badge: "30 days Visa Free",
    price: 105000,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
    slug: "maldives",
  },
  {
    name: "Mauritius",
    badge: "90 days Visa Free",
    price: 99999,
    image: "https://images.unsplash.com/photo-1589979481223-deb893043163?w=600&q=80",
    slug: "mauritius",
  },
  {
    name: "Nepal",
    badge: "No Visa Required",
    price: 30000,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
    slug: "nepal",
  },
];

export const featuredPackages = [
  {
    name: "GOLDEN GATEWAYS",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    tag: "Europe",
  },
  {
    name: "Japan In Autumn",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    tag: "Asia",
  },
  {
    name: "Europe Under 1 Lakh",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    tag: "Budget",
  },
  {
    name: "BIG TRIPS, SMALL BUDGET",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tag: "Adventure",
  },
];

export function formatINR(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(2)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}k`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatINRFull(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
