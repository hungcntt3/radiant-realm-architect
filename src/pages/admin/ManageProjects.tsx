import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { projects as initialProjects } from "@/data/fakeData";

export default function ManageProjects() {
  const [projects, setProjects] = useState(initialProjects);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast({ title: "Project deleted successfully" });
  };

  return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Projects</h1>
            <p className="text-muted-foreground">
              Create, edit, and delete your portfolio projects
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary hover-lift">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input placeholder="Project title" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea placeholder="Short description" rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Image URL</label>
                  <Input placeholder="https://..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                  <Input placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">GitHub URL</label>
                    <Input placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Demo URL</label>
                    <Input placeholder="https://demo.com" />
                  </div>
                </div>
                <Button type="submit" className="w-full gradient-primary">
                  Create Project
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl overflow-hidden bg-card border border-border hover-lift hover:shadow-card"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
}
