import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// A simple particle component for cinematic effect
const Particle = ({ delay }: { delay: number }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 2 + 1;
  const duration = Math.random() * 20 + 10;

  return (
    <motion.div
      initial={{ x: `${x}%`, y: `${y}%`, opacity: 0 }}
      animate={{
        y: [`${y}%`, `${y - 10}%`],
        opacity: [0, 0.4, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="absolute w-1 h-1 bg-primary/40 rounded-full blur-[1px] pointer-events-none"
      style={{ width: size, height: size }}
    />
  );
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020205] noise"
    >
      {/* Background Parallax Layers */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Deep Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,12,20,1)_0%,rgba(2,2,5,1)_100%)]" />
        
        {/* Volumetric Glows */}
        <motion.div
          style={{ x: useTransform(smoothX, (v) => v * -0.5), y: useTransform(smoothY, (v) => v * -0.5) }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] volumetric-light opacity-30"
        />
        <motion.div
          style={{ x: useTransform(smoothX, (v) => v * 0.3), y: useTransform(smoothY, (v) => v * 0.3) }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] volumetric-light opacity-20 filter hue-rotate-90"
        />

        {/* Grid Overlay with Parallax */}
        <motion.div 
          style={{ 
            x: useTransform(smoothX, (v) => v * 0.2), 
            y: useTransform(smoothY, (v) => v * 0.2) 
          }}
          className="absolute inset-0 grid-pattern opacity-[0.07]" 
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none particles-container">
        {[...Array(40)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Abstract 3D-style Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ 
            x: useTransform(smoothX, (v) => v * 0.8), 
            y: useTransform(smoothY, (v) => v * 0.8),
            rotate: 15
          }}
          className="absolute top-20 right-[15%] w-64 h-64 border border-primary/10 rounded-xl bg-primary/5 backdrop-blur-3xl"
        />
        <motion.div
          style={{ 
            x: useTransform(smoothX, (v) => v * -1.2), 
            y: useTransform(smoothY, (v) => v * -1.2),
            rotate: -20
          }}
          className="absolute bottom-40 left-[10%] w-48 h-48 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-2xl"
        />
      </div>

      {/* Content Area */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }} 
        className="container relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtle Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-[0.2em] uppercase font-medium text-primary/80 mb-10 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={12} className="text-primary animate-pulse" />
              Empowering the Next Generation of Creators
            </span>
            <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
          </motion.div>

          {/* Headline - Sora Font */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="font-sora text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1] tracking-[-0.03em] text-white"
            >
              Create Games.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-glow to-accent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Design Worlds.
              </span>
              <br />
              Build the Future.
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide text-balance"
          >
            A professional academy for game development, 3D animation, and creative design — built for the next generation of creators.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button variant="default" size="xl" className="btn-sweep px-12 group" asChild>
              <Link to="/courses">
                Explore Courses
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" className="px-12 border-white/10 hover:border-primary/50 text-white/90" asChild>
              <Link to="/register">
                Join Artvince Academy
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Camera Bloom effect following mouse */}
      <motion.div
        style={{
          x: useTransform(smoothX, (v) => v * 15),
          y: useTransform(smoothY, (v) => v * 15),
          left: "50%",
          top: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Decorative vertical lines */}
      <div className="absolute bottom-0 left-[5%] w-[1px] h-32 bg-gradient-to-t from-primary/30 to-transparent z-0" />
      <div className="absolute top-0 right-[5%] w-[1px] h-32 bg-gradient-to-b from-accent/30 to-transparent z-0" />

      {/* Bottom fade for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020205] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
