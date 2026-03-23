import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Clients />
      <Stats />
      <WhyUs />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
