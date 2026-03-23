import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import aboutPortrait from "@/assets/about-portrait.png";

const ease = [0.25, 0.1, 0.25, 1] as const;

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-off-white py-24 section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[40%_1fr] gap-12 items-start">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          className="border-l-4 border-gold overflow-hidden"
        >
          <img
            src={aboutPortrait}
            alt="Arvydas Bogocionkas portrait"
            className="w-full h-full object-cover object-[center_20%]"
            style={{ aspectRatio: "3/4" }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <p className="eyebrow mb-3">About the Company</p>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.875rem)] font-bold text-navy mb-6">
            Marine Surveys &<br />Inspections MB
          </h2>

          <div className="space-y-4 font-body text-[15px] text-grey leading-relaxed mb-8">
            {[
              "Marine Surveys & Inspections MB is an independent marine consultancy established in 2009, providing vessel inspection, survey and technical management services to the international shipping industry from our base near Klaipėda, Lithuania.",
              "Our founder, Arvydas Bogocionkas, brings nearly three decades of hands-on seagoing and shore-based marine management experience. From engine rooms to boardrooms, he has built a practice rooted in technical accuracy, commercial awareness and straightforward communication.",
              "We serve shipowners, charterers, P&I clubs, insurers, banks and investors across the Baltic region and worldwide — wherever an independent, qualified view of a vessel's true condition is needed.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.12 }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Founder block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.65 }}
            className="border-t border-border pt-6"
          >
            <p className="font-body text-base font-semibold text-navy">Arvydas Bogocionkas</p>
            <p className="font-body text-sm text-grey">Marine Surveyor & Consultant</p>
            <p className="font-body text-xs text-grey/70 mt-1">
              Established 2009 · Klaipėda, Lithuania
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.8 }}
            className="font-display italic text-gold text-lg mt-6"
          >
            "Trusted by shipowners, charterers and P&I clubs worldwide."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
