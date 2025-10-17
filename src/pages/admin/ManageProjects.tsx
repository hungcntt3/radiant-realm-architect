import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { projectService, Project, CreateProjectRequest } from "@/services/project.service";

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<CreateProjectRequest>({
    title: "",
    description: "",
    tags: [],
    thumbnail: "",
    link: "",
    status: "active",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjects(response.data.projects);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectService.updateProject(editingProject.id, formData);
        toast({ title: "Project updated successfully" });
      } else {
        await projectService.createProject(formData);
        toast({ title: "Project created successfully" });
      }
      setIsOpen(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await projectService.deleteProject(id);
      toast({ title: "Project deleted successfully" });
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags,
      thumbnail: project.thumbnail || "",
      link: project.link || "",
      status: project.status,
    });
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tags: [],
      thumbnail: "",
      link: "",
      status: "active",
    });
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

        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setEditingProject(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gradient-primary hover-lift">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Project title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Short description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Thumbnail URL</label>
                <Input
                  placeholder="https://..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                <Input
                  placeholder="React, Node.js, MongoDB"
                  value={formData.tags?.join(", ")}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()) })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Project URL</label>
                <Input
                  placeholder="https://project.com"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full gradient-primary">
                {editingProject ? "Update Project" : "Create Project"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-20">Loading projects...</div>
      ) : (
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
                src={project.thumbnail || "https://via.placeholder.com/400x300"}
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
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(project)}>
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
      )}
    </div>
  );
}
