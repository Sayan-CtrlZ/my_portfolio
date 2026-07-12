import { useState, useEffect } from "react";
import { Terminal, Shield, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "MANIFESTO", href: "#about" },
    { label: "TOOLKIT", href: "#skills" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONNECT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 border-b-4 border-black ${
        scrolled ? "bg-brutal-yellow py-3" : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 font-sans font-black text-xl md:text-2xl text-brutal-dark hover:translate-x-[2px] transition-transform select-none"
        >
          <span className="bg-black text-white p-1.5 border-2 border-black rotate-[-3deg] inline-block shadow-brutal-sm">
            <Terminal className="w-5 h-5" />
          </span>
          <span className="tracking-tight">Sayan_CtrlZ</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 border-2 border-transparent hover:border-black hover:bg-black hover:text-white font-mono text-sm font-black transition-all steps(2) uppercase select-none"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="brutal-btn-hover bg-brutal-orange text-black font-mono font-black text-xs px-4 py-2.5 border-2 border-black shadow-brutal-sm uppercase"
          >
            CONNECT
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 border-2 border-black bg-white text-black hover:bg-gray-100 shadow-brutal-sm cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[64px] left-0 right-0 bg-white border-b-4 border-black shadow-brutal-lg z-40 flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 border-2 border-black font-sans font-black text-lg hover:bg-brutal-yellow transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 border-2 border-black bg-brutal-orange text-black font-mono font-black text-sm uppercase shadow-brutal"
          >
            CONNECT
          </a>
        </div>
      )}
    </header>
  );
}
