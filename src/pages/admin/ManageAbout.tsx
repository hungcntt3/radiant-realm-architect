import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { personalInfo, timeline, values } from "@/data/fakeData";
import { useToast } from "@/hooks/use-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ManageAbout() {
  const { toast } = useToast();
  const [bio, setBio] = useState(personalInfo.bio);
  const [timelineItems, setTimelineItems] = useState(timeline);
  const [valuesList, setValuesList] = useState(values);
  const [editingTimeline, setEditingTimeline] = useState<any>(null);
  const [editingValue, setEditingValue] = useState<any>(null);
  const [isTimelineDialogOpen, setIsTimelineDialogOpen] = useState(false);
  const [isValueDialogOpen, setIsValueDialogOpen] = useState(false);

  const handleSaveBio = () => {
    toast({
      title: "Bio updated!",
      description: "Your bio has been saved successfully.",
    });
  };

  const handleSaveTimeline = () => {
    if (editingTimeline.id) {
      setTimelineItems(
        timelineItems.map((item) =>
          item.id === editingTimeline.id ? editingTimeline : item
        )
      );
    } else {
      setTimelineItems([
        ...timelineItems,
        { ...editingTimeline, id: Date.now() },
      ]);
    }
    setIsTimelineDialogOpen(false);
    setEditingTimeline(null);
    toast({ title: "Timeline saved!" });
  };

  const handleDeleteTimeline = (id: number) => {
    setTimelineItems(timelineItems.filter((item) => item.id !== id));
    toast({ title: "Timeline item deleted" });
  };

  const handleSaveValue = () => {
    if (editingValue.id) {
      setValuesList(
        valuesList.map((item) =>
          item.id === editingValue.id ? editingValue : item
        )
      );
    } else {
      setValuesList([...valuesList, { ...editingValue, id: Date.now() }]);
    }
    setIsValueDialogOpen(false);
    setEditingValue(null);
    toast({ title: "Value saved!" });
  };

  const handleDeleteValue = (id: number) => {
    setValuesList(valuesList.filter((item) => item.id !== id));
    toast({ title: "Value deleted" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage About</h1>
      </div>

      {/* Bio Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bio / Introduction</h2>
        <div className="mb-4">
          <ReactQuill
            theme="snow"
            value={bio}
            onChange={setBio}
            className="h-64 mb-12"
          />
        </div>
        <Button onClick={handleSaveBio} className="mt-4">
          <Save className="w-4 h-4 mr-2" />
          Save Bio
        </Button>
      </Card>

      {/* Timeline Section */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Career Timeline</h2>
          <Dialog
            open={isTimelineDialogOpen}
            onOpenChange={setIsTimelineDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                onClick={() =>
                  setEditingTimeline({ year: "", title: "", company: "", description: "" })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Timeline
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTimeline?.id ? "Edit" : "Add"} Timeline Item
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Year"
                  value={editingTimeline?.year || ""}
                  onChange={(e) =>
                    setEditingTimeline({ ...editingTimeline, year: e.target.value })
                  }
                />
                <Input
                  placeholder="Title"
                  value={editingTimeline?.title || ""}
                  onChange={(e) =>
                    setEditingTimeline({ ...editingTimeline, title: e.target.value })
                  }
                />
                <Input
                  placeholder="Company"
                  value={editingTimeline?.company || ""}
                  onChange={(e) =>
                    setEditingTimeline({ ...editingTimeline, company: e.target.value })
                  }
                />
                <Input
                  placeholder="Description"
                  value={editingTimeline?.description || ""}
                  onChange={(e) =>
                    setEditingTimeline({
                      ...editingTimeline,
                      description: e.target.value,
                    })
                  }
                />
                <Button onClick={handleSaveTimeline} className="w-full">
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {timelineItems.map((item) => (
            <motion.div
              key={item.id}
              className="p-4 border border-border rounded-lg flex justify-between items-start"
            >
              <div>
                <div className="font-semibold text-primary">{item.year}</div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.company}</div>
                <div className="text-sm mt-2">{item.description}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingTimeline(item);
                    setIsTimelineDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteTimeline(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Values Section */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Core Values</h2>
          <Dialog open={isValueDialogOpen} onOpenChange={setIsValueDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingValue({ text: "" })}>
                <Plus className="w-4 h-4 mr-2" />
                Add Value
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingValue?.id ? "Edit" : "Add"} Value
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Value text"
                  value={editingValue?.text || ""}
                  onChange={(e) =>
                    setEditingValue({ ...editingValue, text: e.target.value })
                  }
                />
                <Button onClick={handleSaveValue} className="w-full">
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {valuesList.map((item) => (
            <motion.div
              key={item.id}
              className="p-4 border border-border rounded-lg flex justify-between items-center"
            >
              <span>{item.text}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingValue(item);
                    setIsValueDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteValue(item.id)}
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
