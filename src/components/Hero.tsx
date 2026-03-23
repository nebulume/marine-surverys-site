import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

type Easing = [number, number, number, number];
const ease: Easing = [0.25, 0.1, 0.25, 1];

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroBg}
          alt="Aerial view of cargo vessel at sea"
          className="w-full h-[130%] object-cover object-center"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-navy"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        className="relative z-10 max-w-[860px] mx-auto px-6 text-center pt-28"
        style={{ y: textY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="eyebrow mb-6 !text-sm"
        >
          Baltic Region & Worldwide
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-secondary-foreground leading-[1.1] mb-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="inline-block"
          >
            Independent Ship{" "}
          </motion.span>
          <br className="hidden sm:block" />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="inline-block"
          >
            Inspections
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
          className="font-body text-xl text-grey max-w-[580px] mx-auto mb-8"
        >
          Fast, reliable vessel inspections by certified marine surveyors
          delivering independent, objective reports you can act on.
        </motion.p>

        {/* Animated process steps */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {["Request inspection", "Surveyor attends vessel", "Digital report within 48h"].map(
            (step, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease, delay: 0.7 + i * 0.15 }}
                className="font-body text-lg text-gold flex items-center gap-2 sm:gap-3"
              >
                {step}
                {i < 2 && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.85 + i * 0.15 }}
                  >
                    →
                  </motion.span>
                )}
              </motion.span>
            )
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="btn-primary">
            Get in Touch
          </a>
          <a href="#services" className="btn-primary">
            View Services
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease, delay: 1.3 }}
          className="h-px bg-gold/30 mx-6 md:mx-20 origin-left"
        />
        <div className="flex justify-center py-6">
          <ChevronDown className="text-gold/60 animate-bounce-arrow" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
