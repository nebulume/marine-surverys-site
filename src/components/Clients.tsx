import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Ship, Navigation, Shield, Landmark } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const clients = [
  {
    icon: Ship,
    label: "Shipowners & Managers",
    funny: "Cost‑Cutting Custodians",
    detail: "Pre‑purchase inspections, fleet condition monitoring, dry‑dock planning input, and technical ship audits.",
  },
  {
    icon: Navigation,
    label: "Charterers & Operators",
    funny: "Delay Architects",
    detail: "On/off‑hire, bunker and draft surveys before and after employment.",
  },
  {
    icon: Shield,
    label: "P&I Clubs & Insurers",
    funny: "Exclusion Champions",
    detail: "Damage, H&M, P&I and risk‑focused surveys after incidents or for portfolio review.",
  },
  {
    icon: Landmark,
    label: "Banks & Investors",
    funny: "Fair‑Weather Financiers",
    detail: "Asset condition assessments and ongoing portfolio monitoring for financed vessels.",
  },
];

const ClientCard = ({ c, i, isInView, ease, Icon }: {
  c: { label: string; funny: string; detail: string };
  i: number;
  isInView: boolean;
  ease: readonly number[];
  Icon: React.ElementType;
}) => {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: ease as [number,number,number,number], delay: 0.2 + i * 0.08 }}
      className="flex flex-col"
    >
      {/* Card */}
      <div
        className={`border p-8 flex flex-col items-center justify-center gap-4 transition-all duration-200 cursor-pointer overflow-hidden h-[160px] ${
          active ? "border-gold bg-gold/[0.08]" : "border-secondary-foreground/15 hover:border-gold hover:bg-gold/[0.08]"
        }`}
        style={{ borderRadius: 4 }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => setActive(v => !v)}
      >
        <Icon className="text-gold" size={32} strokeWidth={1.5} />
        <div className="flex items-center justify-center min-h-[2.5rem]">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.span
                key="funny"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="font-body text-sm font-medium text-gold text-center"
              >
                {c.funny}
              </motion.span>
            ) : (
              <motion.span
                key="label"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="font-body text-base font-semibold text-secondary-foreground text-center"
              >
                {c.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail text below card */}
      <p className="font-body text-sm text-grey leading-relaxed text-center mt-4 px-2">
        {c.detail}
      </p>
    </motion.div>
  );
};

const Clients = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-navy py-20 section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="eyebrow mb-3">Our Clients</p>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold text-secondary-foreground mb-4">
            Who We Work With
          </h2>
          <p className="font-body text-grey max-w-[560px] mx-auto mb-12">
            We support decision-makers across the shipping value chain wherever an independent,
            technically sound view of vessel condition is needed.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {clients.map((c, i) => {
            const Icon = c.icon;
            return (
              <ClientCard key={i} c={c} i={i} isInView={isInView} ease={ease} Icon={Icon} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Clients;
