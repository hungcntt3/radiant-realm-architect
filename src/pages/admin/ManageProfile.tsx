import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { personalInfo, socialLinks as initialSocialLinks } from "@/data/fakeData";
import { useToast } from "@/hooks/use-toast";

export default function ManageProfile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState(personalInfo);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [editingLink, setEditingLink] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated!",
      description: "Your personal information has been saved.",
    });
  };

  const handleUploadCV = () => {
    toast({
      title: "CV uploaded!",
      description: "Your CV has been uploaded successfully.",
    });
  };

  const handleSaveLink = () => {
    if (editingLink.id) {
      setSocialLinks(
        socialLinks.map((link) =>
          link.id === editingLink.id ? editingLink : link
        )
      );
    } else {
      setSocialLinks([...socialLinks, { ...editingLink, id: Date.now() }]);
    }
    setIsDialogOpen(false);
    setEditingLink(null);
    toast({ title: "Social link saved!" });
  };

  const handleDeleteLink = (id: number) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
    toast({ title: "Social link deleted" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Profile</h1>
      </div>

      {/* Personal Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="title">Title / Position</Label>
            <Input
              id="title"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={profile.location}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              value={profile.avatar}
              onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
            />
          </div>
        </div>
        <Button onClick={handleSaveProfile} className="mt-4">
          <Save className="w-4 h-4 mr-2" />
          Save Profile
        </Button>
      </Card>

      {/* CV Upload */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">CV / Resume</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="cv">CV URL</Label>
            <Input
              id="cv"
              value={profile.cvUrl}
              onChange={(e) => setProfile({ ...profile, cvUrl: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleUploadCV}>
              <Upload className="w-4 h-4 mr-2" />
              Upload New CV
            </Button>
            <Button variant="outline" asChild>
              <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
                View Current CV
              </a>
            </Button>
          </div>
        </div>
      </Card>

      {/* Social Links */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Social Links</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() =>
                  setEditingLink({ platform: "", url: "", icon: "" })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingLink?.id ? "Edit" : "Add"} Social Link
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Platform</Label>
                  <Input
                    placeholder="GitHub, LinkedIn, etc."
                    value={editingLink?.platform || ""}
                    onChange={(e) =>
                      setEditingLink({ ...editingLink, platform: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input
                    placeholder="https://..."
                    value={editingLink?.url || ""}
                    onChange={(e) =>
                      setEditingLink({ ...editingLink, url: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Icon Name (Lucide)</Label>
                  <Input
                    placeholder="Github, Linkedin, Twitter, etc."
                    value={editingLink?.icon || ""}
                    onChange={(e) =>
                      setEditingLink({ ...editingLink, icon: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleSaveLink} className="w-full">
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {socialLinks.map((link) => (
            <motion.div
              key={link.id}
              className="p-4 border border-border rounded-lg flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{link.platform}</div>
                <div className="text-sm text-muted-foreground">{link.url}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingLink(link);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteLink(link.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
