import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Ship, Navigation, Shield, Landmark } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const clients = [
  { icon: Ship, label: "Shipowners & Managers", funny: "Cost‑Cutting Custodians" },
  { icon: Navigation, label: "Charterers & Operators", funny: "Delay Architects" },
  { icon: Shield, label: "P&I Clubs & Insurers", funny: "Exclusion Champions" },
  { icon: Landmark, label: "Banks & Investors", funny: "Fair‑Weather Financiers" },
];

const ClientCard = ({ c, i, isInView, ease, Icon }: {
  c: { label: string; funny: string };
  i: number;
  isInView: boolean;
  ease: readonly number[];
  Icon: React.ElementType;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: ease as [number,number,number,number], delay: 0.2 + i * 0.08 }}
      className="border border-secondary-foreground/15 p-8 flex flex-col items-center gap-4 transition-all duration-200 hover:border-gold hover:bg-gold/[0.08] cursor-default overflow-hidden relative"
      style={{ borderRadius: 4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon className="text-gold" size={32} strokeWidth={1.5} />
      <div className="relative h-10 flex items-center justify-center">
        <motion.span
          className="font-body text-base font-semibold text-secondary-foreground text-center absolute whitespace-nowrap"
          animate={{ opacity: hovered ? 0 : 1, y: hovered ? -8 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {c.label}
        </motion.span>
        <motion.span
          className="font-body text-sm font-medium text-gold text-center absolute whitespace-nowrap"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.2 }}
        >
          {c.funny}
        </motion.span>
      </div>
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
