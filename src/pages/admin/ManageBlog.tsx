import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postService, Post, CreatePostRequest } from "@/services/post.service";

export default function ManageBlog() {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: "",
    content: "",
    cover_image: "",
    tags: [],
    status: "draft",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postService.getPosts();
      setBlogPosts(response.data.posts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await postService.updatePost(editingPost.id, formData);
        toast({ title: "Post updated successfully" });
      } else {
        await postService.createPost(formData);
        toast({ title: "Post created successfully" });
      }
      setIsOpen(false);
      setEditingPost(null);
      resetForm();
      fetchPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await postService.deletePost(id);
      toast({ title: "Post deleted successfully" });
      fetchPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      cover_image: post.cover_image || "",
      tags: post.tags,
      status: post.status,
    });
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      cover_image: "",
      tags: [],
      status: "draft",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Blog Posts</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage your blog content
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setEditingPost(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gradient-primary hover-lift">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Post" : "Create New Blog Post"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Post title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Featured Image URL</label>
                <Input
                  placeholder="https://..."
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                <Input
                  placeholder="React, JavaScript, Tutorial"
                  value={formData.tags?.join(", ")}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()) })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Content</label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className="bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full gradient-primary">
                {editingPost ? "Update Post" : "Publish Post"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Blog Posts Table */}
      {loading ? (
        <div className="text-center py-20">Loading posts...</div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Date</th>
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
                        {post.cover_image && (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium line-clamp-1">{post.title}</p>
                          <div className="flex gap-1 mt-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {post.views}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(post)}>
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
      )}
    </div>
  );
}
