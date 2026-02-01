import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Rocket, Award, Users, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue the highest standards in everything we create and teach.",
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "Staying ahead of industry trends to prepare students for tomorrow.",
  },
  {
    icon: Rocket,
    title: "Growth",
    description: "Fostering continuous learning and personal development.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "Delivering premium education that transforms careers.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive network of creators worldwide.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Making world-class education available to everyone.",
  },
];

const stats = [
  { value: "10,000+", label: "Students Worldwide" },
  { value: "50+", label: "Expert Instructors" },
  { value: "100+", label: "Premium Courses" },
  { value: "40+", label: "Countries Reached" },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const missionRef = useRef<HTMLDivElement>(null);
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesRef = useRef<HTMLDivElement>(null);
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background noise">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24 hero-pattern">
          <div className="container">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
                Our Story
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Shaping the Future of
                <br />
                <span className="gradient-text">Creative Education</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Artvince Academy was founded with a singular vision: to bridge the gap between aspiring artists and the game industry's highest standards.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 md:py-32 relative">
          <div className="container">
            <div
              ref={missionRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
            >
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="relative p-10 rounded-3xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To democratize access to premium creative education, empowering anyone with passion to master game development, 3D art, and digital design through industry-grade curriculum and expert mentorship.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative p-10 rounded-3xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To become the world's leading creative academy, recognized for producing industry-ready talent and pushing the boundaries of what's possible in game art and development education.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-card/50 border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="py-24 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
                What We Stand For
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Our Core <span className="gradient-text">Values</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group p-8 rounded-2xl bg-card border border-border card-interactive"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
