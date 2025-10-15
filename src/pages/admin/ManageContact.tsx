import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, Eye, MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contactMessages as initialMessages } from "@/data/fakeData";
import { useToast } from "@/hooks/use-toast";

export default function ManageContact() {
  const { toast } = useToast();
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    // Mark as read
    setMessages(
      messages.map((m) => (m.id === message.id ? { ...m, read: true } : m))
    );
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
    toast({ title: "Message deleted" });
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground mt-2">
            {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((message, i) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-primary/10">
                    {message.read ? (
                      <MailOpen className="w-5 h-5 text-primary" />
                    ) : (
                      <Mail className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{message.name}</h3>
                      {!message.read && (
                        <Badge variant="default">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {message.email}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(message.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm line-clamp-2">{message.message}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleViewMessage(message)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{selectedMessage.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <p className="font-medium">
                  {new Date(selectedMessage.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Message</p>
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button asChild>
                  <a href={`mailto:${selectedMessage.email}`}>Reply via Email</a>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteMessage(selectedMessage.id);
                    setIsDialogOpen(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
