import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Search, Filter, Clock, Users, Star, ArrowRight, Play, Grid, List } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = [
  "All Courses",
  "Game Development",
  "3D Animation",
  "Character Design",
  "Environment Design",
  "Weapon Design",
  "Web Development",
  "App Development",
];

const allCourses = [
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
    level: "Intermediate",
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
    level: "Advanced",
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
    level: "Intermediate",
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
    level: "Beginner",
  },
  {
    id: 5,
    title: "Weapon Design for Games",
    category: "Weapon Design",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    instructor: "Chris Anderson",
    duration: "24 hours",
    students: 980,
    rating: 4.8,
    price: 119,
    level: "Intermediate",
  },
  {
    id: 6,
    title: "Unity Game Development Bootcamp",
    category: "Game Development",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b09?w=800&auto=format&fit=crop&q=80",
    instructor: "Lisa Wang",
    duration: "60 hours",
    students: 4120,
    rating: 4.9,
    price: 299,
    level: "Beginner",
  },
  {
    id: 7,
    title: "Game UI/UX Design Mastery",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80",
    instructor: "Tom Bradley",
    duration: "20 hours",
    students: 1280,
    rating: 4.6,
    price: 99,
    level: "Intermediate",
  },
  {
    id: 8,
    title: "Mobile Game Development with Flutter",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80",
    instructor: "Nina Patel",
    duration: "32 hours",
    students: 890,
    rating: 4.7,
    price: 159,
    level: "Intermediate",
  },
];

function CourseCard({ course, index }: { course: typeof allCourses[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border card-interactive"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
            <Play size={20} className="text-primary-foreground ml-0.5" />
          </div>
        </div>

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/90 text-foreground backdrop-blur-sm">
            {course.category}
          </span>
        </div>

        {/* Level */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/90 text-secondary-foreground backdrop-blur-sm">
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">
          by {course.instructor}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users size={12} />
            {course.students.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-accent">
            <Star size={12} fill="currentColor" />
            {course.rating}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="font-display text-xl font-bold">${course.price}</div>
          <Button variant="ghost" size="sm" className="group/btn" asChild>
            <Link to={`/courses/${course.id}`}>
              View
              <ArrowRight size={14} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Courses" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background noise">
      <Navbar />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 md:py-24 hero-pattern">
          <div className="container">
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Explore Our <span className="gradient-text">Courses</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover industry-leading courses in game development, 3D art, and creative design. Learn at your own pace from world-class instructors.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border sticky top-16 bg-background/80 backdrop-blur-xl z-30">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            {/* Results count */}
            <p className="text-muted-foreground mb-8">
              Showing {filteredCourses.length} courses
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>

            {/* Empty state */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">No courses found</p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All Courses"); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
