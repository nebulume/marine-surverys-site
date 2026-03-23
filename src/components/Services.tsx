import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Search, Anchor, Settings, ClipboardList, Lightbulb, ShieldCheck, Flag } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const services = [
  {
    icon: Search,
    title: "Pre‑purchase & Condition Surveys",
    short: "Independent vessel health check so you avoid costly surprises before you commit.",
    full: "When you buy or charter a vessel, you want facts, not surprises. We carry out thorough pre‑purchase and condition surveys that look at the hull, machinery, safety equipment, cargo spaces and documentation, so you see the ship as it really is, not just as it appears in the brochure. You receive a clear, photo‑rich report with plain‑language explanations and prioritised recommendations, helping you decide whether to proceed, renegotiate or walk away.",
  },
  {
    icon: Anchor,
    title: "Dry‑dock & Repair Supervision",
    short: "On‑site supervision that keeps yard work on spec, on time and within budget.",
    full: "A dry‑dock or major repair can easily drift in cost, time and scope if nobody is watching the details. We act as your eyes and ears in the shipyard – from reviewing specifications and tenders to daily follow‑up on progress, quality and extra works. Our aim is simple: the right work, done safely, at the agreed standard and price, with no surprises when the vessel sails.",
  },
  {
    icon: Settings,
    title: "Technical Ship Management",
    short: "Practical oversight improving reliability while keeping operating costs under control.",
    full: "Running ships efficiently is a balance between safety, reliability and cost. We help owners and managers plan maintenance, prepare budgets, set up practical procedures and check whether the work on board is really done as it should be. With independent technical eyes on your fleet, you gain a realistic view of condition, future repair needs and where money is best spent.",
  },
  {
    icon: ClipboardList,
    title: "Marine & P&I Surveys",
    short: "Clear, impartial facts for faster handling of incidents, claims and disputes.",
    full: "Incidents, claims and disputes are part of shipping – but unclear facts should not be. We perform impartial hull and machinery, cargo, P&I and insurance‑related surveys to establish what actually happened, what is damaged and what it will take to put things right. Our reports are structured so that owners, clubs, underwriters and lawyers can all work from the same technical picture.",
  },
  {
    icon: Lightbulb,
    title: "Consultancy & Spare Parts",
    short: "Technical advice and sourcing support to turn plans into workable solutions on board.",
    full: "Some projects need more than a one‑off survey. We advise on selecting shipyards, planning repairs or conversions, dealing with new rules and choosing realistic technical options. When required, we also assist with sourcing spare parts and equipment from trusted suppliers, so decisions made on paper can be implemented smoothly on board.",
  },
  {
    icon: ShieldCheck,
    title: "Pre‑Vetting Inspections",
    short: "Targeted checks so your vessel is ready for charterers, vetting inspectors and port state control.",
    full: "In addition, we offer focused Pre‑Sale, Pre‑Charter, Pre‑RightShip, and Pre‑PSC inspections designed to prepare your vessel for upcoming transactions, vetting, and port state control. These targeted surveys highlight issues that could delay fixtures, negatively impact ratings, or trigger PSC deficiencies, giving you time to correct them before a charterer, vetting inspector, or authority steps on board.",
  },
  {
    icon: Flag,
    title: "Flag State Inspections (FSI)",
    short: "Objective compliance checks covering flag, statutory, ISM and ISPS requirements.",
    full: "We also carry out Flag State Inspections to verify that vessels remain in compliance with applicable flag and statutory requirements, including ISM and ISPS implementation on board. These inspections provide both owners and flag administrations with an objective view of the ship's condition, documentation, and safety management, helping to prevent detentions and strengthen overall compliance.",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="services" className="bg-off-white py-24 section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-3">Our Services</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold text-navy">
            What We Do
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="h-[2px] w-16 bg-gold mx-auto mt-4 origin-center"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const isOpen = expanded === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                whileHover={!isOpen ? { y: -4, transition: { duration: 0.2 } } : {}}
                className={`bg-card border border-border p-6 transition-all duration-200 group ${
                  isOpen ? "border-gold shadow-[0_0_20px_hsl(var(--gold)/0.1)]" : "hover:border-gold"
                } ${i === services.length - 1 ? "md:col-span-2" : ""}`}
                style={{ borderRadius: 4 }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.08 }}
                  className="w-12 h-[3px] bg-gold mb-5 origin-left"
                />
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="text-steel mb-4 group-hover:text-gold transition-colors duration-300" size={28} strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-body text-lg font-semibold text-navy mb-2">{svc.title}</h3>
                <p className="font-body text-[15px] text-grey leading-relaxed mb-4">{svc.short}</p>

                <motion.button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="font-body text-sm font-medium text-gold hover:text-gold-light transition-colors"
                  whileHover={{ x: isOpen ? -3 : 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? "Show less ←" : "Learn more →"}
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-[14px] text-grey leading-relaxed pt-4 border-t border-border mt-4">
                        {svc.full}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
