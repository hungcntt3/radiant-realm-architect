import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const { id } = useParams();

  // In a real app, fetch post data based on id
  const post = {
    title: "Building Modern Web Applications with React and TypeScript",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "Development",
    content: `
      <h2>Introduction</h2>
      <p>TypeScript has become an essential tool in modern web development, especially when combined with React. In this comprehensive guide, we'll explore how to leverage TypeScript's powerful type system to build robust, scalable React applications.</p>

      <h2>Why TypeScript with React?</h2>
      <p>TypeScript brings several advantages to React development:</p>
      <ul>
        <li>Type safety catches errors at compile time</li>
        <li>Better IDE support with autocomplete and IntelliSense</li>
        <li>Self-documenting code through type definitions</li>
        <li>Easier refactoring and maintenance</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Setting up a new React + TypeScript project is easier than ever. You can use Create React App with the TypeScript template, or modern tools like Vite for faster development experience.</p>

      <h2>Best Practices</h2>
      <p>Here are some key best practices when working with React and TypeScript:</p>
      <ol>
        <li>Define proper types for props and state</li>
        <li>Use type inference where possible</li>
        <li>Leverage utility types for common patterns</li>
        <li>Keep types close to where they're used</li>
      </ol>

      <h2>Conclusion</h2>
      <p>TypeScript significantly enhances the React development experience by providing type safety, better tooling, and improved code maintainability. Whether you're building a small project or a large-scale application, TypeScript is worth the investment.</p>
    `,
  };

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
                  {post.category}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="hover-scale">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </motion.div>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12 rounded-2xl overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </motion.div>

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
