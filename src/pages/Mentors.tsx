import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Twitter, Linkedin, Globe, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";

const mentors = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Game Development Lead",
    bio: "Former Lead Developer at Rockstar Games with 15+ years in AAA game development. Specialist in Unreal Engine and gameplay systems.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    courses: 8,
    students: 4200,
    social: { twitter: "#", linkedin: "#", website: "#" },
  },
  {
    id: 2,
    name: "Maya Chen",
    role: "3D Character Artist",
    bio: "Senior Character Artist with credits at Blizzard and Riot Games. Specializes in stylized and realistic character design for games.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    courses: 6,
    students: 3100,
    social: { twitter: "#", linkedin: "#", website: "#" },
  },
  {
    id: 3,
    name: "James Porter",
    role: "Environment Art Director",
    bio: "Environment Art Director with experience at Naughty Dog and Ubisoft. Expert in world-building and environmental storytelling.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    courses: 5,
    students: 2800,
    social: { twitter: "#", linkedin: "#", website: "#" },
  },
  {
    id: 4,
    name: "Sarah Kim",
    role: "Animation Director",
    bio: "Award-winning animator with experience at Pixar and DreamWorks. Specializes in character animation and motion capture.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80",
    courses: 7,
    students: 3500,
    social: { twitter: "#", linkedin: "#", website: "#" },
  },
  {
    id: 5,
    name: "Chris Anderson",
    role: "Weapon & Props Designer",
    bio: "Principal Prop Artist with 10+ years at Bungie and 343 Industries. Expert in hard-surface modeling and game-ready assets.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    courses: 4,
    students: 1900,
    social: { twitter: "#", linkedin: "#", website: "#" },
  },
  {
    id: 6,
    name: "Lisa Wang",
    role: "Unity Development Expert",
    bio: "Unity Certified Expert and former tech lead at Supercell. Specializes in mobile game development and optimization.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    courses: 9,
    students: 5200,
    social: { twitter: "#", linkedin: "#", website: "#" },
  },
];

function MentorCard({ mentor, index }: { mentor: typeof mentors[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border card-interactive"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

        {/* Social links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={mentor.social.twitter}
            className="p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Twitter size={16} />
          </a>
          <a
            href={mentor.social.linkedin}
            className="p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={mentor.social.website}
            className="p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Globe size={16} />
          </a>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mb-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
              {mentor.role}
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold mb-2">{mentor.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>

          {/* Stats */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-border/50 text-sm">
            <div>
              <span className="font-semibold text-foreground">{mentor.courses}</span>
              <span className="text-muted-foreground ml-1">Courses</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">{mentor.students.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">Students</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Mentors() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

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
                Learn from the Best
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Meet Our Expert
                <br />
                <span className="gradient-text">Mentors</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Industry veterans from AAA studios who've shipped blockbuster games and now dedicate themselves to training the next generation of creators.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mentors Grid */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {mentors.map((mentor, i) => (
                <MentorCard key={mentor.id} mentor={mentor} index={i} />
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
