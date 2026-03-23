import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const stats = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Vessels Inspected" },
  { value: 30, suffix: "+", label: "Countries Served" },
  { value: 48, suffix: "h", label: "Report Turnaround" },
];

const AnimatedCounter = ({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(value / 60));
    const interval = duration / (value / step);

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [active, value]);

  return (
    <span className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-gold leading-none">
      {count}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-navy py-16 section-padding border-t border-secondary-foreground/10" ref={ref}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: i * 0.1 }}
            className="text-center"
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} active={isInView} />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.1 }}
              className="h-[2px] w-12 bg-gold/40 mx-auto my-3 origin-center"
            />
            <p className="font-body text-sm text-grey uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
