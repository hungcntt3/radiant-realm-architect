import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
import { dashboardService, DashboardStats, WeeklyViewsData, ProjectsTimelineData } from "@/services/dashboard.service";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [weeklyViews, setWeeklyViews] = useState<WeeklyViewsData[]>([]);
  const [projectsTimeline, setProjectsTimeline] = useState<ProjectsTimelineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, weeklyRes, timelineRes] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getWeeklyViews(),
        dashboardService.getProjectsTimeline(),
      ]);
      
      setStats(statsRes.data.stats);
      setWeeklyViews(weeklyRes.data.weeklyViews);
      setProjectsTimeline(timelineRes.data.projectsTimeline);
    } catch (error: any) {
      toast({
        title: "Lỗi tải dữ liệu",
        description: error.response?.data?.error?.message || "Không thể tải dữ liệu dashboard",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Loading your portfolio overview...</p>
        </div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      change: `+${stats.growthRates.viewsGrowth}%`,
      icon: Eye,
      color: "text-blue-500",
    },
    {
      title: "Projects",
      value: stats.totalProjects.toString(),
      change: `+${stats.growthRates.projectsGrowth}%`,
      icon: FolderOpen,
      color: "text-purple-500",
    },
    {
      title: "Blog Posts",
      value: stats.totalPosts.toString(),
      change: `+${stats.growthRates.postsGrowth}%`,
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      title: "Certificates",
      value: stats.totalCertificates.toString(),
      change: "+0%",
      icon: Award,
      color: "text-orange-500",
    },
  ];

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
            {statsCards.map((stat, i) => (
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
                    <BarChart data={weeklyViews}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="week" className="text-muted-foreground" />
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
                    <LineChart data={projectsTimeline}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-muted-foreground" />
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
                        dataKey="created"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 6 }}
                        name="Created"
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--chart-2))", r: 6 }}
                        name="Completed"
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
                    { title: "Projects Added (7 days)", count: stats.recentActivity.projectsAdded },
                    { title: "Posts Published (7 days)", count: stats.recentActivity.postsPublished },
                    { title: "Skills Added (7 days)", count: stats.recentActivity.skillsAdded },
                  ].map((action) => (
                    <div
                      key={action.title}
                      className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <div className="text-sm text-muted-foreground mb-1">
                        {action.title}
                      </div>
                      <div className="text-2xl font-bold">{action.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
      </div>
  );
}
