import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Home/Navbar";
import About from "@/components/Home/About";
import Footer from "@/components/Home/Footer";

export default function Home() {
  return (<>
    <Navbar />
    <Hero />
    <About />
    <Footer />
  </>
  );
}
