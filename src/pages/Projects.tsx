import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
import { projectService, Project } from "@/services/project.service";

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getProjects();
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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
            {loading ? (
              <div className="text-center py-20">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">No projects found</div>
            ) : (
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
                      src={project.thumbnail || "https://via.placeholder.com/400x300"}
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
                      {project.link && (
                        <Button
                          size="sm"
                          className="flex-1 gradient-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.link, "_blank");
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
                ))}
              </div>
            )}
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
                  {selectedProject.thumbnail && (
                    <img
                      src={selectedProject.thumbnail}
                      alt={selectedProject.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}

                  <p className="text-muted-foreground">{selectedProject.description}</p>

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

                  {selectedProject.link && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        className="w-full gradient-primary"
                        onClick={() => window.open(selectedProject.link, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
