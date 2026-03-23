import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import msiLogo from "@/assets/msi-logo.png";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", isRoute: false },
  { label: "Services", href: "#services", isRoute: false },
  { label: "About", href: "#about", isRoute: false },
  { label: "Gallery", href: "/gallery", isRoute: true },
];

const ContactBar = ({ className, position }: { className?: string; position: "top" | "bottom" }) => (
  <div className={className}>
    <div className="max-w-[1400px] mx-auto flex items-center justify-end gap-5 px-6 md:px-12 lg:px-20 h-8">
      <a
        href="tel:+37065644277"
        className="flex items-center gap-1.5 font-body text-[12px] text-secondary-foreground/70 hover:text-gold transition-colors"
      >
        <Phone size={12} strokeWidth={1.5} />
        +370 656 44277
      </a>
      <a
        href="mailto:info@marinesurveys.eu"
        className="flex items-center gap-1.5 font-body text-[12px] text-secondary-foreground/70 hover:text-gold transition-colors"
      >
        <Mail size={12} strokeWidth={1.5} />
        info@marinesurveys.eu
      </a>
    </div>
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isRoute) {
      navigate(link.href);
    } else if (location.pathname !== "/") {
      navigate("/" + link.href);
    } else {
      const el = document.querySelector(link.href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Check if user has scrolled near the footer area
      if (location.pathname !== "/") {
        setNearBottom(false);
        return;
      }
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setNearBottom(window.scrollY > 50 && scrollBottom >= docHeight - 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top contact bar — hides when bottom bar appears */}
      <AnimatePresence>
        {!nearBottom && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="contact-top fixed top-0 left-0 right-0 z-50 bg-navy/90 border-b border-secondary-foreground/10"
          >
            <ContactBar position="top" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom contact bar — appears when near footer */}
      <AnimatePresence>
        {nearBottom && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.3 }}
            className="contact-bottom fixed bottom-0 left-0 right-0 z-50 bg-navy/90 border-t border-secondary-foreground/10"
          >
            <ContactBar position="bottom" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          nearBottom ? "top-0" : "top-8"
        } ${
          scrolled || location.pathname !== "/" ? "bg-navy shadow-lg" : "bg-transparent"
        }`}
        style={{
          backdropFilter: scrolled || location.pathname !== "/" ? "none" : "blur(12px)",
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 h-[72px]">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <img src={msiLogo} alt="MSI Logo" className="h-12 w-auto" />
            <span className="hidden sm:block font-body text-[13px] font-medium text-secondary-foreground leading-tight">
              Marine Surveys
              <br />& Inspections
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavClick(link)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                className="font-body text-[13px] font-medium uppercase tracking-[0.08em] text-secondary-foreground/80 hover:text-secondary-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-secondary-foreground"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-navy flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => { handleNavClick(link); setMobileOpen(false); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="font-body text-lg font-medium uppercase tracking-[0.08em] text-secondary-foreground"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
