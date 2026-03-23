import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import whyUsImage from "@/assets/why-us.jpg";

const ease = [0.25, 0.1, 0.25, 1] as const;

const items = [
  {
    num: "01",
    title: "Independent view you can trust",
    body: "We only sell inspections and advice – not repairs – so our reports stay objective and focused entirely on your interests.",
  },
  {
    num: "02",
    title: "Experience from bridge to boardroom",
    body: "Nearly thirty years of seagoing and shore‑based management experience means we understand the technical details and the commercial pressure you work under.",
  },
  {
    num: "03",
    title: "Fast, practical reporting",
    body: "Request inspection → Surveyor attends → Digital preliminary report within 48 hours. Clear photos, prioritised actions, no filler.",
  },
];

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-card py-24 section-padding" ref={ref}>
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[55%_45%] gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="eyebrow mb-3">Why Choose Us</p>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold text-navy mb-10">
            Built on Independence,
            <br />
            Delivered with Urgency
          </h2>

          <div className="space-y-0">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.15 }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className={`py-6 ${i < items.length - 1 ? "border-b border-border" : ""} group cursor-default`}
              >
                <div className="flex items-start gap-5">
                  <motion.span
                    className="font-display text-4xl font-bold text-gold/30 group-hover:text-gold transition-colors duration-300 shrink-0"
                  >
                    {item.num}
                  </motion.span>
                  <div>
                    <h3 className="font-body text-[17px] font-semibold text-navy mb-2 group-hover:text-steel transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="font-body text-[15px] text-grey leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          className="hidden lg:block overflow-hidden"
          style={{ borderRadius: "0 60px 0 60px" }}
        >
          <img src={whyUsImage} alt="Surveyor inspecting vessel" className="w-full h-full object-cover" style={{ aspectRatio: "4/5" }} />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
