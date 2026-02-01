import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Mentors", href: "/mentors" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg opacity-80 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]" />
            <span className="relative font-sora font-bold text-lg text-primary-foreground">A</span>
          </div>
          <span className="font-sora font-bold text-xl tracking-tighter">
            ARTVINCE<span className="text-primary-glow">ACADEMY</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass border-t border-border/50 mt-3"
          >
            <nav className="container py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium hover:bg-secondary rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
