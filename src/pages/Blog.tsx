import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { postService, Post } from "@/services/post.service";

export default function Blog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getPosts({ status: 'published' });
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
            {loading ? (
              <div className="text-center py-20">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">No posts found</div>
            ) : (
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, i) => (
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
                          src={post.cover_image || "https://via.placeholder.com/400x300"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            {post.tags[0] || "Blog"}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(post.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.views} views</span>
                          </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.content.substring(0, 150)}...
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
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
