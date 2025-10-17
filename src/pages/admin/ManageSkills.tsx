import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { skillService, Skill, CreateSkillRequest } from "@/services/skill.service";

export default function ManageSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<CreateSkillRequest>({
    name: "",
    category: "",
    level: 75,
  });
  const { toast } = useToast();

  const categories = ["Frontend", "Backend", "Tools", "Design", "Database", "DevOps", "Mobile"];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillService.getSkills();
      setSkills(response.data.skills);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch skills",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await skillService.updateSkill(editingSkill.id, formData);
        toast({ title: "Skill updated successfully" });
      } else {
        await skillService.createSkill(formData);
        toast({ title: "Skill created successfully" });
      }
      setIsOpen(false);
      setEditingSkill(null);
      resetForm();
      fetchSkills();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save skill",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      await skillService.deleteSkill(id);
      toast({ title: "Skill deleted successfully" });
      fetchSkills();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    });
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      level: 75,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Skills</h1>
          <p className="text-muted-foreground">
            Add and manage your technical skills and proficiency levels
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setEditingSkill(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gradient-primary hover-lift">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Skill Name</label>
                <Input
                  placeholder="React, Node.js, etc."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Proficiency Level: {formData.level}%
                </label>
                <Slider
                  value={[formData.level]}
                  onValueChange={(value) => setFormData({ ...formData, level: value[0] })}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>
              <Button type="submit" className="w-full gradient-primary">
                {editingSkill ? "Update Skill" : "Add Skill"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="text-center py-20">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-xl bg-card border border-border hover-lift hover:shadow-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {skill.category}
                  </span>
                </div>
                <div className="text-2xl font-bold text-primary">{skill.level}%</div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute left-0 top-0 bottom-0 gradient-primary rounded-full"
                />
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(skill)}>
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(skill.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
