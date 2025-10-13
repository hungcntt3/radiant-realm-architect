import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
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
import { blogPosts as initialBlogPosts } from "@/data/fakeData";
import { AdminLayout } from "./AdminLayout";

export default function ManageBlog() {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    setBlogPosts(blogPosts.filter((p) => p.id !== id));
    toast({ title: "Blog post deleted successfully" });
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Blog Posts</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your blog content
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary hover-lift">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input placeholder="Post title" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Excerpt</label>
                  <Textarea placeholder="Short description..." rows={2} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Input placeholder="Development, Design, etc." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Featured Image URL</label>
                  <Input placeholder="https://..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Content (Markdown)</label>
                  <Textarea placeholder="Write your post content in markdown..." rows={10} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Read Time</label>
                    <Input placeholder="8 min read" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Author</label>
                    <Input placeholder="Your Name" />
                  </div>
                </div>
                <Button type="submit" className="w-full gradient-primary">
                  Publish Post
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Blog Posts Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Read Time</th>
                  <th className="px-6 py-4 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {blogPosts.map((post, i) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium line-clamp-1">{post.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {post.readTime}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
