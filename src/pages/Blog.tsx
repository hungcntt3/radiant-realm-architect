import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt:
      "Learn how to leverage TypeScript's type safety to build robust React applications that scale...",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "Development",
  },
  {
    id: 2,
    title: "The Art of Animation in Web Design",
    excerpt:
      "Discover how to create engaging user experiences with thoughtful animations and micro-interactions...",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    date: "2024-03-10",
    readTime: "6 min read",
    category: "Design",
  },
  {
    id: 3,
    title: "Optimizing React Performance: Tips and Tricks",
    excerpt:
      "A comprehensive guide to improving your React app's performance with proven optimization techniques...",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    date: "2024-03-05",
    readTime: "10 min read",
    category: "Development",
  },
  {
    id: 4,
    title: "Understanding Tailwind CSS: A Utility-First Approach",
    excerpt:
      "Why utility-first CSS frameworks are changing the way we style modern web applications...",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
    date: "2024-02-28",
    readTime: "7 min read",
    category: "CSS",
  },
  {
    id: 5,
    title: "Mastering Framer Motion for React",
    excerpt:
      "Create stunning animations and transitions with Framer Motion, the production-ready motion library...",
    image: "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=800&q=80",
    date: "2024-02-20",
    readTime: "9 min read",
    category: "Animation",
  },
  {
    id: 6,
    title: "Building Accessible Web Applications",
    excerpt:
      "Best practices for creating inclusive and accessible web experiences for all users...",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
    date: "2024-02-15",
    readTime: "11 min read",
    category: "Accessibility",
  },
];

export default function Blog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                My <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Thoughts, tutorials, and insights on web development and design
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section ref={ref} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="group h-full rounded-2xl overflow-hidden bg-card border border-border hover-lift hover:shadow-elevated">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <Button
                          variant="ghost"
                          className="group/btn px-0 hover:bg-transparent"
                        >
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
