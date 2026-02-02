import { useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Play, ArrowRight, Sparkles, GraduationCap, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const particles = useMemo(() => [
    { icon: Sparkles, x: "-10%", y: "20%", size: 20, delay: 0, speed: 0.05 },
    { icon: Play, x: "15%", y: "10%", size: 24, delay: 0.2, speed: 0.08 },
    { icon: Zap, x: "-15%", y: "60%", size: 18, delay: 0.4, speed: 0.03 },
    { icon: GraduationCap, x: "12%", y: "70%", size: 22, delay: 0.6, speed: 0.06 },
    { icon: Globe, x: "25%", y: "40%", size: 16, delay: 0.8, speed: 0.04 },
  ], []);

  const titleWords = "Master the Art of Game Creation".split(" ");

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern group/hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl"
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => {
            const particleX = useTransform(springX, [-0.5, 0.5], [`${-50 * p.speed}%`, `${50 * p.speed}%`]);
            const particleY = useTransform(springY, [-0.5, 0.5], [`${-50 * p.speed}%`, `${50 * p.speed}%`]);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.4, 0.2], scale: 1 }}
                transition={{ duration: 1, delay: p.delay }}
                style={{ left: p.x, top: p.y, x: particleX, y: particleY }}
                className="absolute"
              >
                <p.icon size={p.size} className="text-primary/40" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity, rotateX, rotateY, perspective: 1000 }}
        className="container relative z-10 pt-24"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-8 hover:bg-primary/20 transition-colors pointer-events-auto cursor-default font-calligraphic text-xl tracking-wide"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-primary font-medium">New courses available for 2024</span>
          </motion.div>

          {/* Headline with Word Reveal */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight mb-6">
            <div className="flex flex-wrap justify-center gap-x-[0.2em]">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: 45 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }
                    }
                  }}
                  className={cn("inline-block transform-gpu", i >= 4 && "gradient-text")}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 text-balance"
          >
            Learn 3D Animation, Character Design, Game Development, and more from industry professionals who've worked on AAA titles.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="premium" size="xl" asChild>
              <Link to="/courses">
                Explore Courses
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/about">
                <Play size={20} className="mr-1" />
                Watch Showreel
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20 pt-10 border-t border-border/50"
          >
            {[
              { value: "10K+", label: "Students Enrolled", icon: Globe },
              { value: "50+", label: "Expert Mentors", icon: GraduationCap },
              { value: "100+", label: "Premium Courses", icon: Zap },
              { value: "95%", label: "Success Rate", icon: Sparkles },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-center p-4 rounded-xl hover:bg-white/5 transition-colors group/stat"
              >
                <div className="flex justify-center mb-3">
                  <stat.icon size={24} className="text-primary opacity-50 group-hover/stat:opacity-100 transition-opacity" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
