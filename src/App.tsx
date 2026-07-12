import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Marquee from "./components/Marquee";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-brutal-dark bg-brutal-light">
      {/* Sticky Brutalist Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-grow pt-[72px]">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: About */}
        <About />

        {/* Scroll-Linked scrub Marquee effect */}
        <Marquee />

        {/* Section 3: Skills */}
        <Skills />

        {/* Section 4: Projects */}
        <Projects />
      </main>

      {/* Section 5: Contact / Footer */}
      <Footer />
    </div>
  );
}

