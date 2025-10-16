import api from '@/lib/api';

export interface DashboardStats {
  totalViews: number;
  totalProjects: number;
  totalPosts: number;
  totalSkills: number;
  totalCertificates: number;
  growthRates: {
    projectsGrowth: number;
    postsGrowth: number;
    viewsGrowth: number;
  };
  recentActivity: {
    projectsAdded: number;
    postsPublished: number;
    skillsAdded: number;
    certificatesAdded: number;
  };
}

export interface WeeklyViewsData {
  week: string; // YYYY-MM-DD
  views: number;
}

export interface ProjectsTimelineData {
  month: string; // YYYY-MM
  created: number;
  completed: number;
}

export const dashboardService = {
  async getStats(): Promise<{ success: boolean; data: { stats: DashboardStats } }> {
    const response = await api.get('/api/dashboard');
    return response.data;
  },

  async getWeeklyViews(): Promise<{ success: boolean; data: { weeklyViews: WeeklyViewsData[] } }> {
    const response = await api.get('/api/dashboard/weekly-views');
    return response.data;
  },

  async getProjectsTimeline(): Promise<{ success: boolean; data: { projectsTimeline: ProjectsTimelineData[] } }> {
    const response = await api.get('/api/dashboard/projects-timeline');
    return response.data;
  },
};
