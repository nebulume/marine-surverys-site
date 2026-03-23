import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Facebook, Linkedin } from "lucide-react";
import msiFooterLogo from "@/assets/msi-footer-logo.png";

const ease = [0.25, 0.1, 0.25, 1] as const;

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="bg-footer-bg py-16 section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Col 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={msiFooterLogo} alt="Marine Surveys & Inspections Logo" className="h-12 w-12 object-contain" />
              <span className="font-body text-[13px] font-medium text-secondary-foreground leading-tight">
                Marine Surveys<br />& Inspections
              </span>
            </div>
            <p className="font-body text-sm text-grey leading-relaxed mb-3">
              Independent marine surveying and consultancy for the global shipping industry.
            </p>
            <p className="font-body text-xs text-grey/60">Klaipėda, Lithuania</p>
          </motion.div>

          {/* Col 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-grey mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              {["Services", "About"].map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, ease, delay: 0.2 + i * 0.05 }}
                  className="block font-body text-sm text-secondary-foreground/70 hover:text-gold hover:translate-x-1 transition-all duration-200"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
          >
            <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-grey mb-4">
              Contact
            </h4>
            <p className="font-body text-sm text-secondary-foreground/70 mb-1">+370 656 44277</p>
            <p className="font-body text-sm text-secondary-foreground/70 mb-4">info@marinesurveys.eu</p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/shipsurvey" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/surveys" },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 border border-secondary-foreground/20 flex items-center justify-center hover:border-gold hover:text-gold text-secondary-foreground/50 transition-colors"
                  style={{ borderRadius: 4 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          className="border-t border-secondary-foreground/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2"
        >
          <p className="font-body text-xs text-grey/50">
            © 2026 Marine Surveys & Inspections MB. All rights reserved.
          </p>
          <p className="font-body text-xs text-grey/50">info@marinesurveys.eu</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
