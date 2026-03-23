import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import img1 from "@/assets/gallery/laivai.jpg";
import img2 from "@/assets/gallery/MAK_3.jpg";
import img3 from "@/assets/gallery/P7146400.jpg";
import img4 from "@/assets/gallery/P7146809.jpg";
import img5 from "@/assets/gallery/P7146812.jpg";
import img6 from "@/assets/gallery/P7146818.jpg";
import img7 from "@/assets/gallery/P8207551.jpg";
import img8 from "@/assets/gallery/PA077687.jpg";
import img9 from "@/assets/gallery/PC223415.jpg";
import img10 from "@/assets/gallery/SPM.jpg";
import img11 from "@/assets/gallery/sraigtas.jpg";
import img12 from "@/assets/gallery/UR101_2S_28.jpg";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface GalleryItem {
  src: string;
  alt: string;
}

const photos: GalleryItem[] = [
  { src: img1, alt: "Vessels in dry dock" },
  { src: img2, alt: "MaK engine room" },
  { src: img3, alt: "Ship bridge navigation equipment" },
  { src: img4, alt: "Hull draft marks" },
  { src: img5, alt: "Vessel bow at port" },
  { src: img6, alt: "UECC car carrier" },
  { src: img7, alt: "Main engine machinery" },
  { src: img8, alt: "Tanker deck piping" },
  { src: img9, alt: "Bulk carrier bow" },
  { src: img10, alt: "SPM buoy through hawse pipe" },
  { src: img11, alt: "Propeller machining in workshop" },
  { src: img12, alt: "Cargo hold interior inspection" },
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);

  const navigate = (dir: number) => {
    if (lightbox === null) return;
    const next = lightbox + dir;
    if (next >= 0 && next < photos.length) setLightbox(next);
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      <section className="pt-32 pb-24 section-padding" ref={ref}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-16"
          >
            <p className="eyebrow mb-3">Our Work</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold text-navy">
              Gallery
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="h-[2px] w-16 bg-gold mx-auto mt-4 origin-center"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: i * 0.05 }}
                onClick={() => openLightbox(i)}
                className="relative overflow-hidden h-[240px] group cursor-pointer"
                style={{ borderRadius: 4 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-navy/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-secondary-foreground/80 hover:text-secondary-foreground transition-colors z-10"
            >
              <X size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 text-secondary-foreground/60 hover:text-secondary-foreground transition-colors z-10"
            >
              <ChevronLeft size={36} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 text-secondary-foreground/60 hover:text-secondary-foreground transition-colors z-10"
            >
              <ChevronRight size={36} />
            </button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
