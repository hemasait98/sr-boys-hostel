import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  BedDouble,
  BookOpen,
  Camera,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Facebook,
  Instagram,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Twitter,
  Users,
  UtensilsCrossed,
  Wifi,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Room, Testimonial } from "./backend.d.ts";
import {
  useRooms,
  useSubmitInquiry,
  useTestimonials,
} from "./hooks/useQueries";

// ── constants ────────────────────────────────────────────────────────────────
const PHONE = "+91 95051 82824";
const WA_LINK = "https://wa.me/919505182824";
const ADDRESS = "Near Benz Circle, Vijayawada, Andhra Pradesh – 520010";

const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "ROOMS", href: "#rooms" },
  { label: "FACILITIES", href: "#facilities" },
  { label: "GALLERY", href: "#gallery" },
  { label: "TESTIMONIALS", href: "#testimonials" },
  { label: "CONTACT", href: "#contact" },
];

const FALLBACK_ROOMS: Room[] = [
  {
    id: "1",
    name: "Single Occupancy",
    price: BigInt(6500),
    features: [
      "Single Bed",
      "Personal Locker",
      "Attached Bathroom",
      "Study Table",
    ],
    isAvailable: true,
  },
  {
    id: "2",
    name: "Double Sharing",
    price: BigInt(5000),
    features: ["Two Beds", "Shared Locker", "Attached Bathroom", "Ceiling Fan"],
    isAvailable: true,
  },
  {
    id: "3",
    name: "Triple Sharing",
    price: BigInt(4000),
    features: [
      "Three Beds",
      "Individual Lockers",
      "Common Bathroom",
      "WiFi Access",
    ],
    isAvailable: true,
  },
  {
    id: "4",
    name: "AC Deluxe",
    price: BigInt(9500),
    features: [
      "King Bed",
      "Air Conditioning",
      "Attached Bathroom",
      "Mini Wardrobe",
    ],
    isAvailable: false,
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    studentName: "Ravi Kumar",
    course: "B.Tech CSE, KIET – 3rd Year",
    review:
      "SR Boys Hostel has been my home away from home. The food is fantastic and the WiFi is super reliable. I feel very safe here.",
    rating: BigInt(5),
  },
  {
    id: "2",
    studentName: "Kiran Reddy",
    course: "MBA Finance, AU – 2nd Year",
    review:
      "Best decision I made for my stay in Vijayawada. Clean rooms, hot meals every day, and the staff are very cooperative.",
    rating: BigInt(5),
  },
  {
    id: "3",
    studentName: "Suresh Naidu",
    course: "UPSC Aspirant – IAS Coaching",
    review:
      "The study hall is perfectly quiet and available 24/7. Power backup ensures I never lose study time. Highly recommend SR Hostel!",
    rating: BigInt(4),
  },
];

const FACILITIES = [
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Wind, label: "Laundry Service" },
  { icon: Zap, label: "Power Backup" },
  { icon: Droplets, label: "Hot Water" },
  { icon: UtensilsCrossed, label: "Homely Food" },
  { icon: Camera, label: "CCTV Coverage" },
  { icon: BookOpen, label: "Study Hall" },
];

const GALLERY_ITEMS = [
  { label: "Deluxe Room", color: "bg-blue-900" },
  { label: "Common Dining", color: "bg-amber-800" },
  { label: "Building Front", color: "bg-slate-700" },
  { label: "Study Hall", color: "bg-emerald-800" },
  { label: "Outdoor Space", color: "bg-green-800" },
  { label: "Washroom", color: "bg-cyan-800" },
  { label: "Double Room", color: "bg-indigo-800" },
  { label: "Reception", color: "bg-purple-900" },
];

// ── helpers ───────────────────────────────────────────────────────────────────
function smoothScroll(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function getRoomIcon(name: string) {
  if (name.toLowerCase().includes("single")) return BedDouble;
  if (name.toLowerCase().includes("double")) return Users;
  if (name.toLowerCase().includes("triple")) return Users;
  return BedDouble;
}

// ── sub-components ────────────────────────────────────────────────────────────
function RoomCard({ room, index }: { room: Room; index: number }) {
  const Icon = getRoomIcon(room.name);
  const roomColors = [
    "bg-blue-950",
    "bg-slate-800",
    "bg-indigo-950",
    "bg-[oklch(0.15_0.05_255)]",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
      data-ocid={`room.item.${index + 1}`}
    >
      <div
        className={`h-44 ${roomColors[index % roomColors.length]} flex items-center justify-center`}
      >
        <Icon className="w-16 h-16 text-white/40" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-navy text-base mb-1">{room.name}</h3>
        <p className="text-2xl font-bold text-primary mb-1">
          ₹{Number(room.price).toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground">
            /month
          </span>
        </p>
        <ul className="mt-2 space-y-1 flex-1">
          {room.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              room.isAvailable
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {room.isAvailable ? "Available" : "Fully Booked"}
          </span>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold bg-primary text-white px-4 py-1.5 rounded-full hover:bg-secondary transition-colors"
            data-ocid={`room.primary_button.${index + 1}`}
          >
            Book Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const initials = t.studentName
    .split(" ")
    .map((w) => w[0])
    .join("");
  const avatarColors = ["bg-blue-700", "bg-emerald-700", "bg-purple-700"];
  const ratingStars = Array.from({ length: Number(t.rating) }, (_, i) => i + 1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card rounded-xl shadow-card p-6 flex flex-col gap-4"
      data-ocid={`testimonial.item.${index + 1}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
            avatarColors[index % avatarColors.length]
          }`}
        >
          {initials}
        </div>
        <div>
          <p className="font-bold text-navy text-sm">{t.studentName}</p>
          <p className="text-xs text-muted-foreground">{t.course}</p>
        </div>
      </div>
      <div className="flex gap-0.5">
        {ratingStars.map((star) => (
          <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-foreground leading-relaxed">
        &ldquo;{t.review}&rdquo;
      </p>
    </motion.div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    roomType: "",
    moveInDate: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { data: rooms } = useRooms();
  const { data: testimonials } = useTestimonials();
  const submitInquiry = useSubmitInquiry();

  const displayRooms = rooms && rooms.length > 0 ? rooms : FALLBACK_ROOMS;
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : FALLBACK_TESTIMONIALS;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.phone ||
      !formData.roomType ||
      !formData.moveInDate
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitInquiry.mutateAsync(formData);
      setSubmitted(true);
      toast.success("Inquiry submitted! We'll contact you shortly.");
      setFormData({ name: "", phone: "", roomType: "", moveInDate: "" });
    } catch {
      toast.error("Failed to submit. Please try WhatsApp or call us directly.");
    }
  }

  return (
    <div className="min-h-screen bg-page-bg font-sans">
      <Toaster />

      {/* ── Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white"
        }`}
        data-ocid="nav.panel"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            className="text-navy font-extrabold text-xl tracking-tight hover:opacity-80 transition-opacity"
            data-ocid="nav.link"
            onClick={() => smoothScroll("home")}
          >
            SR BOYS HOSTEL
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-semibold text-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll(link.href.slice(1));
                  setMenuOpen(false);
                }}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Book Now pill */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-primary text-white text-[13px] font-bold px-5 py-2 rounded-full hover:bg-secondary transition-colors"
            data-ocid="nav.primary_button"
          >
            BOOK NOW
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMenuOpen((p) => !p)}
            data-ocid="nav.toggle"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll(link.href.slice(1));
                      setMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-white text-center font-bold px-5 py-2.5 rounded-full mt-2"
                >
                  BOOK NOW
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section
        id="home"
        className="relative min-h-[92vh] flex items-center pt-16"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-hostel.dim_1400x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/90 via-[#0B1F3B]/75 to-[#0B1F3B]/40" />

        <div className="relative max-w-[1200px] mx-auto px-4 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="uppercase text-xs font-bold tracking-widest text-amber-300 mb-4 block">
              Vijayawada's Premier Student Accommodation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Your Home
              <br />
              Away From
              <br />
              <span className="text-amber-300">Home</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
              Safe, hygienic, and affordable stays for students near Benz
              Circle. Experience comfort with all modern amenities.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => smoothScroll("rooms")}
                className="bg-white text-navy font-bold px-7 py-3 rounded-full hover:bg-amber-300 hover:text-navy transition-colors"
                data-ocid="hero.primary_button"
              >
                EXPLORE ROOMS
              </button>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-white text-white font-bold px-7 py-3 rounded-full hover:bg-white hover:text-navy transition-colors flex items-center gap-2"
                data-ocid="hero.secondary_button"
              >
                <MessageCircle className="w-4 h-4" />
                WHATSAPP US
              </a>
            </div>
          </motion.div>

          {/* Quick highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
          >
            {[
              { icon: Wifi, label: "Free WiFi" },
              { icon: Shield, label: "CCTV Security" },
              { icon: UtensilsCrossed, label: "Homely Food" },
              { icon: Zap, label: "Power Backup" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex flex-col items-center gap-2 text-white"
              >
                <Icon className="w-6 h-6 text-amber-300" />
                <span className="text-xs font-semibold text-center">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-primary/70 block mb-3">
                About Us
              </span>
              <h2 className="text-3xl font-extrabold text-navy mb-5 leading-snug">
                Trusted by 500+ Students
                <br />
                Since 2010
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SR Boys Hostel has been providing premium student accommodation
                in Vijayawada for over 14 years. Located conveniently near Benz
                Circle, we are minutes away from top colleges, coaching centers,
                and public transport hubs.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our mission is simple:{" "}
                <strong className="text-navy">
                  Safe, hygienic, and affordable stay for students
                </strong>{" "}
                — so you can focus entirely on your education and career goals.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "14+", label: "Years of Service" },
                  { value: "500+", label: "Students Served" },
                  { value: "3", label: "Room Categories" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-extrabold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-page-bg rounded-2xl p-8 space-y-4"
            >
              {[
                {
                  icon: MapPin,
                  text: "Strategically located near Benz Circle, Vijayawada",
                },
                {
                  icon: Shield,
                  text: "Round-the-clock security with trained staff & CCTV",
                },
                {
                  icon: UtensilsCrossed,
                  text: "Nutritious home-cooked veg & non-veg meals",
                },
                {
                  icon: BookOpen,
                  text: "24/7 study hall with high-speed internet",
                },
                {
                  icon: Zap,
                  text: "Uninterrupted power supply with generator backup",
                },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Rooms ── */}
      <section id="rooms" className="py-20 bg-page-bg">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary/70 block mb-3">
              Accommodation Options
            </span>
            <h2 className="text-3xl font-extrabold text-navy">
              Rooms &amp; Pricing
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
              Choose the room type that best fits your needs and budget. All
              rooms include basic amenities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayRooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section id="facilities" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary/70 block mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl font-extrabold text-navy">
              Why Choose SR Hostel?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {FACILITIES.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-page-bg rounded-xl p-6 flex flex-col items-center gap-3 hover:shadow-card transition-shadow"
                data-ocid={`facility.item.${i + 1}`}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm font-semibold text-navy text-center">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-20 bg-page-bg">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary/70 block mb-3">
              Take a Look
            </span>
            <h2 className="text-3xl font-extrabold text-navy">Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_ITEMS.map(({ label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                viewport={{ once: true }}
                className={`${
                  i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""
                } ${color} rounded-xl overflow-hidden cursor-pointer relative`}
                style={{ minHeight: i === 0 || i === 5 ? "280px" : "140px" }}
                data-ocid={`gallery.item.${i + 1}`}
              >
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="text-white/80 text-xs font-semibold bg-black/30 px-3 py-1 rounded-full">
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary/70 block mb-3">
              Student Reviews
            </span>
            <h2 className="text-3xl font-extrabold text-navy">
              What Our Residents Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {displayTestimonials.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Location strip ── */}
      <section id="location" className="py-16 bg-navy">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-2xl font-extrabold mb-2">Find Us Easily</h2>
              <p className="text-white/70 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-300" />
                {ADDRESS}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <p className="text-white/80 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-300" /> {PHONE}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "KIET College – 0.3 km",
                "Benz Circle Bus Stop – 0.1 km",
                "SRR & CVR College – 1.2 km",
                "APVVP Hospital – 0.5 km",
              ].map((place) => (
                <span
                  key={place}
                  className="text-xs font-semibold bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/20"
                >
                  📍 {place}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-page-bg">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary/70 block mb-3">
              Get in Touch
            </span>
            <h2 className="text-3xl font-extrabold text-navy">Contact Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-navy">
                Reach Out Directly
              </h3>
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: PHONE,
                  href: "tel:+919505182824",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "Chat on WhatsApp",
                  href: WA_LINK,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-start gap-4 group"
                  data-ocid="contact.link"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-navy mt-0.5">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
              {/* Address as a non-link */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Address
                  </p>
                  <p className="text-sm font-semibold text-navy mt-0.5">
                    {ADDRESS}
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden bg-slate-200 h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold text-navy">
                    Near Benz Circle
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Vijayawada, AP
                  </p>
                </div>
              </div>
            </div>

            {/* Inquiry form */}
            <div
              className="bg-card rounded-2xl shadow-card p-8"
              data-ocid="contact.panel"
            >
              <h3 className="text-lg font-bold text-navy mb-6">
                Book a Room / Send Inquiry
              </h3>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-10 text-center"
                    data-ocid="contact.success_state"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                    <h4 className="font-bold text-navy text-lg">
                      Inquiry Submitted!
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Thank you! Our team will contact you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-sm font-semibold text-primary underline hover:no-underline"
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-sm font-semibold text-navy mb-1.5 block"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-sm font-semibold text-navy mb-1.5 block"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-navy mb-1.5 block">
                        Room Type
                      </Label>
                      <Select
                        value={formData.roomType}
                        onValueChange={(v) =>
                          setFormData((p) => ({ ...p, roomType: v }))
                        }
                      >
                        <SelectTrigger data-ocid="contact.select">
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single Occupancy">
                            Single Occupancy – ₹6,500/mo
                          </SelectItem>
                          <SelectItem value="Double Sharing">
                            Double Sharing – ₹5,000/mo
                          </SelectItem>
                          <SelectItem value="Triple Sharing">
                            Triple Sharing – ₹4,000/mo
                          </SelectItem>
                          <SelectItem value="AC Deluxe">
                            AC Deluxe – ₹9,500/mo
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="moveIn"
                        className="text-sm font-semibold text-navy mb-1.5 block"
                      >
                        Preferred Move-in Date
                      </Label>
                      <Input
                        id="moveIn"
                        type="date"
                        value={formData.moveInDate}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            moveInDate: e.target.value,
                          }))
                        }
                        data-ocid="contact.input"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitInquiry.isPending}
                      className="w-full bg-primary text-white rounded-full font-bold py-3 hover:bg-secondary transition-colors mt-2"
                      data-ocid="contact.submit_button"
                    >
                      {submitInquiry.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Send Inquiry"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#111827] text-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-extrabold mb-3">SR BOYS HOSTEL</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Safe, hygienic, and affordable stay for students in Vijayawada.
                Your home away from home since 2010.
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: Facebook,
                    label: "Facebook",
                    href: "https://facebook.com",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    href: "https://instagram.com",
                  },
                  {
                    icon: Twitter,
                    label: "Twitter",
                    href: "https://twitter.com",
                  },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                    data-ocid="footer.link"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScroll(link.href.slice(1));
                      }}
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80">
                Contact Info
              </h4>
              <div className="space-y-3">
                <p className="flex items-start gap-2 text-sm text-white/60">
                  <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                  {ADDRESS}
                </p>
                <p className="flex items-center gap-2 text-sm text-white/60">
                  <Phone className="w-4 h-4 text-amber-300" />
                  {PHONE}
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-amber-300" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} SR Boys Hostel. All rights reserved.
            </p>
            <p className="text-white/40 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white/80 underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp button ── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        data-ocid="nav.link"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
