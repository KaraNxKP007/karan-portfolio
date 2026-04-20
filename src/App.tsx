import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Competitions from "./components/Competitions";

function App() {
  return (
    <div style={{ backgroundColor: "#050816", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Achievements />
      <Competitions />
      <Contact />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;