import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ImagePlaceholder from "./ImagePlaceholder";
import case1Image from "@/assets/case-1.png";
import case2Image from "@/assets/case-2.webp";
import case3Image from "@/assets/case-3.jpg";

const ease = [0.25, 0.1, 0.25, 1] as const;

const cases = [
  {
    image: "case-1",
    imageLabel: "Case study 1 photo",
    tag: "Pre-purchase Survey",
    title: "56k DWT Bulk Carrier — North Europe",
    body: "Client needed independent assessment before finalising purchase. Hull, machinery, cargo holds and documentation inspected. Report with prioritised findings delivered within 24 hours.",
    location: "North Europe",
  },
  {
    image: "case-2",
    imageLabel: "Case study 2 photo",
    tag: "Dry-dock Supervision",
    title: "MR Tanker — China Shipyard",
    body: "Supervised full dry-docking: hull coating, underwater inspection, propeller overhaul, class renewals. Vessel delivered on schedule and within budget.",
    location: "China",
  },
  {
    image: "case-3",
    imageLabel: "Case study 3 photo",
    tag: "P&I Damage Survey",
    title: "Ro‑Ro Vessel — Baltic Sea",
    body: "Attended following cargo damage incident. Established cause, extent and repair requirements. Structured report enabled swift P&I claims resolution.",
    location: "Baltic Sea",
  },
];

const RecentWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-navy-mid py-24 section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-3">Recent Work</p>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold text-secondary-foreground">
            Selected Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="border border-secondary-foreground/10 bg-secondary-foreground/[0.04] overflow-hidden group cursor-pointer"
              style={{ borderRadius: 4 }}
            >
              <div className="relative h-[200px] overflow-hidden">
                <motion.div
                  className="h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease }}
                >
                  {c.image === "case-1" ? (
                    <img src={case1Image} alt={c.imageLabel} className="w-full h-full object-cover" />
                  ) : c.image === "case-2" ? (
                    <img src={case2Image} alt={c.imageLabel} className="w-full h-full object-cover" />
                  ) : (
                    <img src={case3Image} alt={c.imageLabel} className="w-full h-full object-cover" />
                  )}
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.1 }}
                  className="absolute top-3 left-3 font-body text-[11px] font-semibold uppercase tracking-wider bg-gold text-navy px-3 py-1"
                  style={{ borderRadius: 2 }}
                >
                  {c.tag}
                </motion.span>
              </div>
              <div className="p-5">
                <h3 className="font-body text-base font-semibold text-secondary-foreground mb-2 group-hover:text-gold transition-colors duration-200">
                  {c.title}
                </h3>
                <p className="font-body text-sm text-grey leading-relaxed mb-4">{c.body}</p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-[11px] font-semibold uppercase tracking-wider text-gold">
                    {c.location}
                  </span>
                  <motion.span
                    className="font-body text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    View details →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
