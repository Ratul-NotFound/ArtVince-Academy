import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Gamepad2, 
  Users, 
  Trophy, 
  Zap, 
  Palette, 
  Code2,
  GraduationCap,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Industry-Standard Tools",
    description: "Learn with the same tools used by AAA studios: Unreal Engine, Unity, Blender, Maya, and more.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Get personalized guidance from professionals who've worked on blockbuster games and films.",
  },
  {
    icon: Trophy,
    title: "Project-Based Learning",
    description: "Build a portfolio of real projects that showcase your skills to potential employers.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Curriculum",
    description: "Stay ahead with constantly updated courses covering the latest industry techniques.",
  },
  {
    icon: Palette,
    title: "Creative Community",
    description: "Join a vibrant community of artists, developers, and creators from around the world.",
  },
  {
    icon: GraduationCap,
    title: "Career Support",
    description: "Get job placement assistance, portfolio reviews, and interview preparation.",
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      
      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Why Artvince Academy
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Built for <span className="gradient-text">Creators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're not just teaching tools — we're shaping the next generation of creative visionaries.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl bg-card border border-border card-interactive"
            >
              {/* Icon */}
              <div className="relative w-14 h-14 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
