import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Clock, Users, Star, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const courses = [
  {
    id: 1,
    title: "Complete Game Development Masterclass",
    category: "Game Development",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&auto=format&fit=crop&q=80",
    instructor: "Alex Rivera",
    duration: "48 hours",
    students: 2840,
    rating: 4.9,
    price: 199,
    featured: true,
  },
  {
    id: 2,
    title: "Advanced 3D Character Design",
    category: "Character Design",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    instructor: "Maya Chen",
    duration: "36 hours",
    students: 1920,
    rating: 4.8,
    price: 149,
    featured: false,
  },
  {
    id: 3,
    title: "Unreal Engine 5 Environment Art",
    category: "Environment Design",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    instructor: "James Porter",
    duration: "52 hours",
    students: 3210,
    rating: 4.9,
    price: 249,
    featured: true,
  },
  {
    id: 4,
    title: "3D Animation Fundamentals",
    category: "3D Animation",
    image: "https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=800&auto=format&fit=crop&q=80",
    instructor: "Sarah Kim",
    duration: "28 hours",
    students: 1540,
    rating: 4.7,
    price: 129,
    featured: false,
  },
];

interface CourseCardProps {
  course: typeof courses[0];
  index: number;
}

function CourseCard({ course, index }: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-card border border-border card-interactive",
        course.featured && "md:col-span-2 md:row-span-2"
      )}
    >
      {/* Image */}
      <div className={cn(
        "relative overflow-hidden",
        course.featured ? "aspect-[16/10]" : "aspect-video"
      )}>
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
            <Play size={24} className="text-primary-foreground ml-1" />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/90 text-foreground backdrop-blur-sm">
            {course.category}
          </span>
        </div>

        {/* Featured badge */}
        {course.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent/90 text-foreground backdrop-blur-sm flex items-center gap-1">
              <Star size={12} fill="currentColor" />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={cn(
          "font-display font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2",
          course.featured ? "text-2xl" : "text-lg"
        )}>
          {course.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">
          by {course.instructor}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} />
            {course.students.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-accent">
            <Star size={14} fill="currentColor" />
            {course.rating}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="font-display text-2xl font-bold">
            ${course.price}
          </div>
          <Button variant="ghost" size="sm" className="group/btn" asChild>
            <Link to={`/courses/${course.id}`}>
              View Course
              <ArrowRight size={16} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedCourses() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Learn from the best
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked courses designed by industry professionals to accelerate your creative career.
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/courses">
              Browse All Courses
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
