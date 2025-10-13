import { motion } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with payment integration",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    github: "#",
    demo: "#",
    longDescription:
      "Built a complete e-commerce solution with user authentication, product management, shopping cart, and payment processing using Stripe. Features include real-time inventory updates, order tracking, and admin dashboard.",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    github: "#",
    demo: "#",
    longDescription:
      "A modern task management application with real-time collaboration features, drag-and-drop interface, and team management capabilities. Built with Next.js and Supabase for optimal performance.",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Creative portfolio with animations and 3D effects",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind"],
    github: "#",
    demo: "#",
    longDescription:
      "An immersive portfolio website featuring 3D graphics, smooth animations, and interactive elements. Showcases projects with detailed case studies and implements advanced web technologies.",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Real-time weather tracking with beautiful visualizations",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    tags: ["Vue.js", "Chart.js", "Weather API", "CSS"],
    github: "#",
    demo: "#",
    longDescription:
      "An elegant weather dashboard that provides real-time weather data, forecasts, and historical data visualization using Chart.js. Features location-based weather tracking and customizable alerts.",
  },
  {
    id: 5,
    title: "Social Media Clone",
    description: "Full-stack social platform with messaging and posts",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    tags: ["React", "GraphQL", "PostgreSQL", "Redis"],
    github: "#",
    demo: "#",
    longDescription:
      "A feature-rich social media platform with user profiles, posts, comments, likes, real-time messaging, and notifications. Implements optimistic UI updates and efficient data caching.",
  },
  {
    id: 6,
    title: "AI Chat Assistant",
    description: "Conversational AI interface with natural language processing",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tags: ["Next.js", "OpenAI", "Python", "FastAPI"],
    github: "#",
    demo: "#",
    longDescription:
      "An intelligent chatbot powered by OpenAI's GPT model, featuring context-aware conversations, code generation, and multi-language support. Built with a modern tech stack for optimal performance.",
  },
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
                My <span className="text-gradient">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A collection of projects I've built and contributed to
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section ref={ref} className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl overflow-hidden bg-card border border-border hover-lift hover:shadow-elevated cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, "_blank");
                        }}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 gradient-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demo, "_blank");
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                  <DialogDescription>{selectedProject.description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />

                  <p className="text-muted-foreground">{selectedProject.longDescription}</p>

                  <div>
                    <h4 className="font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1"
                      variant="outline"
                      onClick={() => window.open(selectedProject.github, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </Button>
                    <Button
                      className="flex-1 gradient-primary"
                      onClick={() => window.open(selectedProject.demo, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
