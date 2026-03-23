import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, Clock } from "lucide-react";
import contactBg from "@/assets/contact-bg.jpg";
import qrCode from "@/assets/qr-code.png";

const ease = [0.25, 0.1, 0.25, 1] as const;

const contactItems = [
  { icon: Phone, text: "+370 656 44277", href: "tel:+37065644277" },
  { icon: Mail, text: "info@marinesurveys.eu", href: "mailto:info@marinesurveys.eu" },
  { icon: Clock, text: "Available 24/7 for urgent inspections" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 section-padding" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={contactBg} alt="Port at night" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/75" />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.875rem)] font-bold text-secondary-foreground mb-4">
            Get in Touch
          </h2>
          <p className="font-body text-grey max-w-md mx-auto">
            Share your vessel and port details and we will respond with scope and fee options,
            usually within the same working day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact details card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
            className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-sm p-8 flex flex-col justify-center gap-6"
          >
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <div className="flex items-center gap-4 group" key={i}>
                  <div className="w-10 h-10 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon className="text-gold" size={18} strokeWidth={1.5} />
                  </div>
                  <span className="font-body text-secondary-foreground text-[15px] group-hover:text-gold transition-colors duration-200">
                    {item.text}
                  </span>
                </div>
              );
              if (item.href) {
                return <a key={i} href={item.href} className="no-underline">{inner}</a>;
              }
              return inner;
            })}
          </motion.div>

          {/* QR code card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.4 }}
            className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-sm p-8 flex flex-col items-center justify-center gap-4"
          >
            <span className="eyebrow text-gold-light mb-1">Digital Business Card</span>
            <a href="https://view.page/p/8qhMbW" target="_blank" rel="noopener noreferrer">
              <img
                src={qrCode}
                alt="Digital Business Card QR Code"
                className="w-36 h-36 rounded-sm border-2 border-gold/30 hover:border-gold transition-colors duration-200"
              />
            </a>
            <span className="font-body text-grey text-xs tracking-wide">Scan to view contact details</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
