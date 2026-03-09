import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  ShoppingCart,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

/* ─── Data ─────────────────────────────────────────────────── */

const generators = [
  { kva: 15, label: "15 kVA", tag: "Light Duty" },
  { kva: 25, label: "25 kVA", tag: "Light Duty" },
  { kva: 40, label: "40 kVA", tag: "Medium Duty" },
  { kva: 62, label: "62 kVA", tag: "Medium Duty" },
  { kva: 82, label: "82 kVA", tag: "Industrial" },
  { kva: 100, label: "100 kVA", tag: "Industrial" },
  { kva: 125, label: "125 kVA", tag: "Heavy Duty" },
  { kva: 180, label: "180 kVA", tag: "Heavy Duty" },
  { kva: 200, label: "200 kVA", tag: "Heavy Duty" },
  { kva: 250, label: "250 kVA", tag: "Heavy Duty" },
];

const services = [
  {
    icon: Zap,
    title: "Generator Rental",
    desc: "Flexible short-term and long-term rental solutions across all kVA ranges. Quick deployment, fully maintained units delivered to your site.",
    highlight: "Most Popular",
  },
  {
    icon: ShoppingCart,
    title: "Generator Sales",
    desc: "Authorized sub-dealer for leading generator brands. We help you choose the right unit for your load requirements and budget.",
    highlight: null,
  },
  {
    icon: Wrench,
    title: "Service & Maintenance",
    desc: "Expert preventive maintenance, AMC contracts, and 24/7 emergency breakdown support. Keeping your power running without interruption.",
    highlight: "24/7 Support",
  },
  {
    icon: Package,
    title: "Spare Parts",
    desc: "Genuine OEM spare parts supply for all major generator brands. Fast sourcing and availability ensures minimal downtime for your operations.",
    highlight: null,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Wide kVA Range",
    desc: "From 15 kVA to 250 kVA — we have the right generator for any application, any scale.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Round-the-clock technical assistance. Power failures don't keep business hours — neither do we.",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Decades of combined experience in diesel generator installation, maintenance, and repair.",
  },
  {
    icon: Award,
    title: "Genuine Parts",
    desc: "We stock and supply only authentic OEM parts — no compromises on quality or reliability.",
  },
];

/* ─── Hooks ────────────────────────────────────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Sub-components ────────────────────────────────────────── */

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Generators", href: "#generators" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.09_0.012_240/0.97)] shadow-2xl backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav("#home")}
            className="flex items-center gap-3 group"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/canara-logo-hq-transparent.dim_300x300.png"
              alt="Canara Diesels Electricals logo"
              className="w-10 h-10 object-contain rounded"
            />
            <div className="text-left">
              <p className="font-display font-bold text-sm leading-none text-foreground">
                Canara Diesels
              </p>
              <p className="font-label text-[10px] text-muted-foreground tracking-wider uppercase">
                Electricals
              </p>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, i) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNav(link.href)}
                data-ocid={`nav.link.${i + 1}`}
                className="px-4 py-2 text-sm font-label font-medium text-muted-foreground hover:text-amber transition-colors duration-200 rounded"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleNav("#contact")}
              className="ml-4 bg-amber text-[oklch(0.1_0.01_240)] hover:bg-amber-light font-label font-semibold text-sm"
              data-ocid="nav.primary_button"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-[oklch(0.12_0.018_240)] border-t border-border"
            >
              <div className="py-3 flex flex-col gap-1">
                {links.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="px-4 py-3 text-sm font-label text-left text-muted-foreground hover:text-amber transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="px-4 pt-2 pb-3">
                  <Button
                    onClick={() => handleNav("#contact")}
                    className="w-full bg-amber text-[oklch(0.1_0.01_240)] hover:bg-amber-light font-label font-semibold"
                  >
                    Get a Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "oklch(0.09 0.012 240)" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/generator-hero.dim_1200x600.jpg"
          alt="Industrial diesel generator"
          className="w-full h-full object-cover opacity-25"
          loading="eager"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.72 0.17 65) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.17 65) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Amber accent top-bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-amber z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-[oklch(0.72_0.17_65/0.15)] text-amber border-[oklch(0.72_0.17_65/0.3)] font-label text-xs tracking-widest uppercase">
              Diesel Generator Specialists
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6"
          >
            Reliable Power, <span className="text-amber">Anytime,</span>{" "}
            Anywhere
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-body text-lg md:text-xl text-muted-foreground mb-4 max-w-xl"
          >
            Diesel Generator Rentals, Sales & Service
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-base text-muted-foreground mb-10 max-w-2xl"
          >
            Canara Diesels Electricals — your trusted partner for generator
            rental from{" "}
            <span className="text-foreground font-medium">
              15 kVA to 250 kVA
            </span>
            . We deliver power solutions for construction sites, events,
            industries, and critical infrastructure across the region.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-amber text-[oklch(0.1_0.01_240)] hover:bg-amber-light font-label font-bold text-base px-8 py-6 rounded-sm"
              data-ocid="hero.primary_button"
            >
              Get a Quote
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document
                  .querySelector("#generators")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-[oklch(0.72_0.17_65/0.4)] text-foreground hover:bg-[oklch(0.72_0.17_65/0.1)] hover:border-amber font-label font-medium text-base px-8 py-6 rounded-sm bg-transparent"
            >
              View Our Fleet
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 flex flex-wrap gap-8"
          >
            {[
              { value: "10+", label: "kVA Configurations" },
              { value: "24/7", label: "Support Available" },
              { value: "15–250", label: "kVA Range" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-3xl font-bold text-amber">
                  {stat.value}
                </span>
                <span className="font-label text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom diagonal clip visual */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 z-10"
        style={{
          background: "oklch(0.12 0.015 240)",
          clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
        }}
      />
    </section>
  );
}

function AboutSection() {
  const ref = useScrollReveal();
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-[oklch(0.12_0.015_240)] section-divider"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="scroll-fade-in grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text */}
          <div>
            <p className="font-label text-amber text-xs tracking-widest uppercase mb-4">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Trusted Diesel Generator Experts
            </h2>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-5">
              Canara Diesels Electricals is a trusted name in diesel generator
              solutions. With years of field experience, we have built our
              reputation on reliability, technical excellence, and
              customer-first service.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-5">
              Our core business is{" "}
              <span className="text-foreground font-medium">
                generator rental and service
              </span>
              . We operate a well-maintained fleet of generators ranging from 15
              kVA to 250 kVA, ensuring the right power solution is always
              available when and where you need it.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
              We are also{" "}
              <span className="text-foreground font-medium">
                authorized sub-dealers
              </span>{" "}
              for generator sales, and we supply genuine spare parts to keep
              your equipment running at peak performance.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Award, text: "Years of Industry Experience" },
                { icon: Zap, text: "15 kVA to 250 kVA Fleet" },
                { icon: Clock, text: "24/7 Emergency Support" },
                { icon: Package, text: "Genuine OEM Spare Parts" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[oklch(0.72_0.17_65/0.12)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-amber" />
                  </div>
                  <span className="font-label text-sm text-foreground">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div
              className="absolute -top-4 -right-4 w-full h-full rounded-sm border border-[oklch(0.72_0.17_65/0.2)]"
              style={{ zIndex: 0 }}
            />
            <div className="relative z-10 rounded-sm overflow-hidden">
              <img
                src="/assets/generated/generator-service.dim_600x400.jpg"
                alt="Generator service and maintenance"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-[oklch(0.09_0.012_240/0.9)] backdrop-blur-sm p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber rounded-sm flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-[oklch(0.1_0.01_240)]" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-foreground">
                    Expert Service Team
                  </p>
                  <p className="font-label text-xs text-muted-foreground">
                    Certified diesel technicians
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GeneratorsSection() {
  const ref = useScrollReveal();
  return (
    <section
      id="generators"
      className="py-20 md:py-28 bg-navy-deep section-divider"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-label text-amber text-xs tracking-widest uppercase mb-4">
            Our Fleet
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Generator Rental Fleet
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            We maintain a diverse fleet of diesel generators to match every
            power requirement. Contact us to check availability and arrange
            delivery.
          </p>
        </div>

        <div
          ref={ref}
          className="scroll-fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          {generators.map((gen, i) => (
            <div
              key={gen.kva}
              data-ocid={`generators.item.${i + 1}`}
              className="generator-card-hover bg-[oklch(0.16_0.02_240)] border border-[oklch(0.28_0.03_240)] rounded-sm p-5 flex flex-col justify-between cursor-default"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/generated/canara-logo-hq-transparent.dim_300x300.png"
                    alt="logo"
                    className="w-10 h-10 object-contain rounded-sm opacity-90"
                  />
                  <div>
                    <p className="font-display text-3xl font-bold text-amber leading-none">
                      {gen.kva}
                    </p>
                    <p className="font-label text-sm text-muted-foreground mt-0.5">
                      kVA
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border-[oklch(0.72_0.17_65/0.25)] text-amber font-label text-[10px] tracking-wide"
                >
                  {gen.tag}
                </Badge>
              </div>

              {/* Divider */}
              <div className="h-px bg-[oklch(0.28_0.03_240)] mb-4" />

              {/* CTA */}
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full text-sm font-label font-semibold text-amber hover:text-amber-light flex items-center justify-center gap-1.5 py-1 transition-colors"
              >
                Enquire Now
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <p className="text-center font-label text-xs text-muted-foreground mt-8 tracking-wide">
          All generators are well-maintained, load-tested, and available for
          delivery. Contact us for availability and terms.
        </p>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useScrollReveal();
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-[oklch(0.12_0.015_240)] section-divider"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-label text-amber text-xs tracking-widest uppercase mb-4">
            What We Do
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Comprehensive diesel generator solutions — from rental and sales to
            maintenance and spare parts.
          </p>
        </div>

        <div
          ref={ref}
          className="scroll-fade-in grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((svc, i) => (
            <div
              key={svc.title}
              data-ocid={`services.item.${i + 1}`}
              className="relative bg-[oklch(0.16_0.02_240)] border border-[oklch(0.28_0.03_240)] rounded-sm p-7 flex gap-5 overflow-hidden group transition-all duration-300 hover:border-[oklch(0.72_0.17_65/0.3)]"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[oklch(0.72_0.17_65/0.03)]" />

              <div className="w-12 h-12 rounded-sm bg-[oklch(0.72_0.17_65/0.12)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[oklch(0.72_0.17_65/0.2)] transition-colors">
                <svc.icon className="w-6 h-6 text-amber" />
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="font-display font-bold text-lg text-foreground">
                    {svc.title}
                  </h3>
                  {svc.highlight && (
                    <Badge className="bg-[oklch(0.72_0.17_65/0.15)] text-amber border-[oklch(0.72_0.17_65/0.2)] font-label text-[10px] mt-0.5 flex-shrink-0">
                      {svc.highlight}
                    </Badge>
                  )}
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const ref = useScrollReveal();
  return (
    <section className="py-20 md:py-24 bg-navy-deep section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-label text-amber text-xs tracking-widest uppercase mb-4">
            Our Advantage
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Canara Diesels?
          </h2>
        </div>

        <div
          ref={ref}
          className="scroll-fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              className="text-center p-6 rounded-sm border border-[oklch(0.28_0.03_240)] bg-[oklch(0.14_0.018_240)] hover:border-[oklch(0.72_0.17_65/0.3)] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-sm bg-[oklch(0.72_0.17_65/0.1)] flex items-center justify-center mx-auto mb-5 group-hover:bg-[oklch(0.72_0.17_65/0.2)] transition-colors">
                <b.icon className="w-6 h-6 text-amber" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground mb-2">
                {b.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useScrollReveal();
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (!actor) {
      toast.error("Connection not ready. Please try again.");
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await actor.submitEnquiry(
        form.name,
        form.phone,
        form.email,
        form.message,
      );
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
      toast.success("Enquiry sent successfully! We'll contact you shortly.");
    } catch {
      setStatus("error");
      toast.error("Failed to send enquiry. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-[oklch(0.12_0.015_240)] section-divider"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <div ref={ref} className="scroll-fade-in">
            <p className="font-label text-amber text-xs tracking-widest uppercase mb-4">
              Contact Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
              Get in Touch With Our Team
            </h2>
            <p className="font-body text-muted-foreground mb-2 leading-relaxed">
              Looking for a generator rental, service, or spare parts? Send us
              your requirements and our team will get back to you promptly.
            </p>
            <p className="font-label text-sm text-foreground mb-8">
              Proprietor:{" "}
              <span className="text-amber font-semibold">
                Arvind Sreenth Reddy
              </span>
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  label: "Call Us",
                  value: "8867264314 / 9845059842",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "canaradiesels@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value:
                    "8/E, 1st Floor, Thayappa Layout, Journalist Colony, J C Road, Bangalore – 560002",
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "24/7 Emergency Support",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[oklch(0.72_0.17_65/0.12)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-amber" />
                  </div>
                  <div>
                    <p className="font-label text-xs text-muted-foreground tracking-wider uppercase">
                      {label}
                    </p>
                    <p className="font-body text-sm text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-[oklch(0.16_0.02_240)] border border-[oklch(0.28_0.03_240)] rounded-sm p-7 md:p-9">
            <h3 className="font-display font-bold text-xl text-foreground mb-6">
              Send an Enquiry
            </h3>

            {/* Success state */}
            {status === "success" && (
              <div
                data-ocid="contact.success_state"
                className="flex items-start gap-3 bg-[oklch(0.55_0.15_140/0.12)] border border-[oklch(0.55_0.15_140/0.3)] rounded-sm p-4 mb-6"
              >
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.65_0.15_140)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-label font-semibold text-sm text-foreground">
                    Enquiry Sent!
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">
                    Thank you! Our team will contact you shortly.
                  </p>
                </div>
              </div>
            )}

            {/* Error state */}
            {status === "error" && (
              <div
                data-ocid="contact.error_state"
                className="flex items-start gap-3 bg-[oklch(0.577_0.245_27.325/0.1)] border border-[oklch(0.577_0.245_27.325/0.3)] rounded-sm p-4 mb-6"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-foreground">
                  Something went wrong. Please try again or call us directly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="font-label text-xs text-muted-foreground tracking-wider uppercase"
                >
                  Full Name <span className="text-amber">*</span>
                </Label>
                <Input
                  id="name"
                  data-ocid="contact.input"
                  value={form.name}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, name: e.target.value }));
                    if (errors.name)
                      setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Your full name"
                  className="bg-[oklch(0.12_0.018_240)] border-[oklch(0.28_0.03_240)] text-foreground placeholder:text-muted-foreground/50 focus:border-amber focus:ring-amber font-body"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="font-label text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="font-label text-xs text-muted-foreground tracking-wider uppercase"
                >
                  Phone Number <span className="text-amber">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  data-ocid="contact.input"
                  value={form.phone}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, phone: e.target.value }));
                    if (errors.phone)
                      setErrors((p) => ({ ...p, phone: undefined }));
                  }}
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-[oklch(0.12_0.018_240)] border-[oklch(0.28_0.03_240)] text-foreground placeholder:text-muted-foreground/50 focus:border-amber focus:ring-amber font-body"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p className="font-label text-xs text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="font-label text-xs text-muted-foreground tracking-wider uppercase"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  data-ocid="contact.email_input"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="bg-[oklch(0.12_0.018_240)] border-[oklch(0.28_0.03_240)] text-foreground placeholder:text-muted-foreground/50 focus:border-amber focus:ring-amber font-body"
                  autoComplete="email"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="message"
                  className="font-label text-xs text-muted-foreground tracking-wider uppercase"
                >
                  Your Requirements
                </Label>
                <Textarea
                  id="message"
                  data-ocid="contact.textarea"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us your power requirement, duration, location, or any specific needs..."
                  rows={4}
                  className="bg-[oklch(0.12_0.018_240)] border-[oklch(0.28_0.03_240)] text-foreground placeholder:text-muted-foreground/50 focus:border-amber focus:ring-amber font-body resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={status === "loading"}
                data-ocid="contact.submit_button"
                className="w-full bg-amber text-[oklch(0.1_0.01_240)] hover:bg-amber-light font-label font-bold py-6 rounded-sm text-base transition-all"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span data-ocid="contact.loading_state">
                      Sending Enquiry...
                    </span>
                  </>
                ) : (
                  "Send Enquiry"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-navy-deep border-t border-[oklch(0.22_0.028_240)]">
      {/* Amber top line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-amber to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/canara-logo-hq-transparent.dim_300x300.png"
                alt="Canara Diesels Electricals logo"
                className="w-10 h-10 object-contain rounded-sm"
              />
              <div>
                <p className="font-display font-bold text-sm text-foreground leading-none">
                  Canara Diesels
                </p>
                <p className="font-label text-[10px] text-muted-foreground tracking-wider uppercase">
                  Electricals
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your trusted partner for diesel generator rental, sales, service,
              and spare parts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-label text-xs text-amber tracking-widest uppercase mb-4">
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Generator Fleet", href: "#generators" },
                { label: "Services", href: "#services" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    data-ocid="footer.link"
                    className="font-body text-sm text-muted-foreground hover:text-amber transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-amber" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-label text-xs text-amber tracking-widest uppercase mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li className="font-body text-sm text-muted-foreground">
                <span className="text-foreground font-medium">
                  Arvind Sreenth Reddy
                </span>
                <br />
                Proprietor
              </li>
              <li className="font-body text-sm text-muted-foreground flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber flex-shrink-0" />
                8867264314 / 9845059842
              </li>
              <li className="font-body text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber flex-shrink-0" />
                canaradiesels@gmail.com
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-label text-xs text-amber tracking-widest uppercase mb-4">
              Our Services
            </p>
            <ul className="space-y-2.5">
              {[
                "Generator Rental",
                "Generator Sales",
                "Service & Maintenance",
                "Spare Parts Supply",
              ].map((s) => (
                <li key={s}>
                  <span className="font-body text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber inline-block" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[oklch(0.22_0.028_240)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted-foreground">
            © {year} Canara Diesels Electricals. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── WhatsApp Float Button ─────────────────────────────────── */

function WhatsAppButton() {
  const phoneNumber = "919845059842";
  const message = encodeURIComponent(
    "Hello! I'm interested in your diesel generator rental/service.",
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl px-4 py-3 transition-all duration-300 group hover:scale-105 active:scale-95"
      style={{ boxShadow: "0 4px 24px rgba(37,211,102,0.45)" }}
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 flex-shrink-0"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.363.62 4.672 1.8 6.699L2.667 29.333l6.803-1.776A13.27 13.27 0 0 0 16.003 29.333C23.367 29.333 29.333 23.367 29.333 16c0-7.363-5.97-13.333-13.33-13.333zm0 2.4c6.037 0 10.933 4.896 10.933 10.933 0 6.037-4.896 10.933-10.933 10.933a10.88 10.88 0 0 1-5.548-1.52l-.399-.24-4.036 1.055 1.08-3.924-.263-.415A10.88 10.88 0 0 1 5.07 16C5.07 9.963 9.966 5.067 16.003 5.067zm-3.04 5.6c-.2 0-.52.075-.793.375-.272.3-1.04 1.016-1.04 2.48s1.064 2.876 1.213 3.074c.15.198 2.073 3.265 5.083 4.449.71.279 1.264.446 1.696.571.713.208 1.362.178 1.875.108.572-.078 1.762-.72 2.011-1.415.25-.696.25-1.293.175-1.417-.075-.124-.274-.198-.573-.348-.3-.15-1.762-.869-2.035-.968-.274-.1-.473-.15-.672.15-.2.3-.772.968-.946 1.167-.173.2-.348.224-.647.075-.3-.15-1.264-.466-2.409-1.485-.89-.793-1.491-1.773-1.665-2.073-.174-.3-.019-.462.13-.611.134-.134.3-.348.45-.522.15-.174.199-.3.299-.498.1-.2.05-.374-.025-.523-.075-.15-.672-1.622-.921-2.22-.243-.58-.49-.5-.672-.51a12.9 12.9 0 0 0-.573-.01z" />
      </svg>
      <span className="font-label font-semibold text-sm whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </a>
  );
}

/* ─── App ───────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <GeneratorsSection />
        <ServicesSection />
        <WhyChooseUs />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.16 0.02 240)",
            border: "1px solid oklch(0.28 0.03 240)",
            color: "oklch(0.96 0.01 90)",
          },
        }}
      />
    </div>
  );
}
