import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { postService, Post } from "@/services/post.service";

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const response = await postService.getPostById(id);
        setPost(response.data.post);
        // Increment views
        await postService.incrementViews(id);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-20 flex items-center justify-center">
          Loading post...
        </div>
      </PageTransition>
    );
  }

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-20 flex items-center justify-center">
          Post not found
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        <article className="py-12">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link to="/blog">
                <Button variant="ghost" className="hover-scale">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {post.tags[0] || "Blog"}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.views} views</span>
                  </div>
                  <Button variant="ghost" size="sm" className="hover-scale">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </motion.div>

              {/* Featured Image */}
              {post.cover_image && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12 rounded-2xl overflow-hidden"
                >
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>
      </div>
    </PageTransition>
  );
}
