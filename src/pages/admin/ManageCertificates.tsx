import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Edit, Trash2, ExternalLink, Award } from "lucide-react";
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
import { certificates as initialCertificates } from "@/data/fakeData";
import { AdminLayout } from "./AdminLayout";

export default function ManageCertificates() {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    setCertificates(certificates.filter((c) => c.id !== id));
    toast({ title: "Certificate deleted successfully" });
  };

  return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Certificates</h1>
            <p className="text-muted-foreground">
              Add and manage your professional certifications
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary hover-lift">
                <Plus className="w-4 h-4 mr-2" />
                Add Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Certificate</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Certificate Title</label>
                  <Input placeholder="AWS Certified Solutions Architect" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Organization</label>
                  <Input placeholder="Amazon Web Services" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Issue Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Image URL</label>
                  <Input placeholder="https://..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea placeholder="Brief description of the certification" rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Verification Link</label>
                  <Input placeholder="https://verify.example.com" />
                </div>
                <Button type="submit" className="w-full gradient-primary">
                  Add Certificate
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl overflow-hidden bg-card border border-border hover-lift hover:shadow-card"
            >
              <div className="relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-primary/90 backdrop-blur-sm">
                  <Award className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-1">{cert.title}</h3>
                <p className="text-sm text-primary mb-2">{cert.organization}</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {cert.description}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(cert.verificationLink, "_blank")}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(cert.id)}
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
