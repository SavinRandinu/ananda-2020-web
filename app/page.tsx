import About from "@/components/About";
import BatchParty from "@/components/BatchParty";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Magazine from "@/components/Magazine";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Team from "@/components/Team";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Projects />
        <Magazine />
        <BatchParty />
        <Team />
      </main>
      <Footer />
    </>
  );
}
