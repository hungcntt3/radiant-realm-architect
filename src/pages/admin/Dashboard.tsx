import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Eye, MessageSquare, FolderOpen, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analytics } from "@/data/fakeData";

const stats = [
  {
    title: "Total Views",
    value: analytics.totalViews.toLocaleString(),
    change: `+${analytics.viewsChange}%`,
    icon: Eye,
    color: "text-blue-500",
  },
  {
    title: "Projects",
    value: analytics.totalProjects.toString(),
    change: `+${analytics.projectsChange}`,
    icon: FolderOpen,
    color: "text-purple-500",
  },
  {
    title: "Blog Posts",
    value: analytics.totalBlogPosts.toString(),
    change: `+${analytics.postsChange}`,
    icon: MessageSquare,
    color: "text-green-500",
  },
  {
    title: "Certificates",
    value: analytics.totalCertificates.toString(),
    change: "+2",
    icon: Award,
    color: "text-orange-500",
  },
];

const viewsData = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 300 },
  { name: "Wed", views: 600 },
  { name: "Thu", views: 800 },
  { name: "Fri", views: 500 },
  { name: "Sat", views: 700 },
  { name: "Sun", views: 900 },
];

const projectsData = [
  { name: "Jan", projects: 4 },
  { name: "Feb", projects: 6 },
  { name: "Mar", projects: 8 },
  { name: "Apr", projects: 5 },
  { name: "May", projects: 9 },
  { name: "Jun", projects: 7 },
];

export default function AdminDashboard() {
  return (
      <div className="space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your portfolio.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="hover-lift hover:shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-green-500">{stat.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Views Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="hover-lift hover:shadow-card">
                <CardHeader>
                  <CardTitle>Weekly Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="views" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Projects Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="hover-lift hover:shadow-card">
                <CardHeader>
                  <CardTitle>Projects Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={projectsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="projects"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <Card className="hover-lift hover:shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Manage Projects", count: 24 },
                    { title: "Manage Blog Posts", count: 42 },
                    { title: "View Analytics", count: "12K+" },
                  ].map((action) => (
                    <button
                      key={action.title}
                      className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-left"
                    >
                      <div className="text-sm text-muted-foreground mb-1">
                        {action.title}
                      </div>
                      <div className="text-2xl font-bold">{action.count}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
      </div>
  );
}
