import api from '@/lib/api';

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail?: string;
  link?: string;
  status: 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  tags?: string[];
  thumbnail?: string;
  link?: string;
  status?: 'active' | 'completed' | 'archived';
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {}

export interface GetProjectsParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'completed' | 'archived';
  sortBy?: 'created_at' | 'updated_at' | 'title';
  sortOrder?: 'ASC' | 'DESC';
}

export const projectService = {
  async getProjects(params?: GetProjectsParams): Promise<{ 
    success: boolean; 
    data: { 
      projects: Project[];
      pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      };
    } 
  }> {
    const response = await api.get('/api/projects', { params });
    return response.data;
  },

  async getProjectById(id: string): Promise<{ success: boolean; data: { project: Project } }> {
    const response = await api.get(`/api/projects/${id}`);
    return response.data;
  },

  async getProjectsByUserId(userId: string): Promise<{ success: boolean; data: { projects: Project[] } }> {
    const response = await api.get(`/api/projects/user/${userId}`);
    return response.data;
  },

  async createProject(data: CreateProjectRequest): Promise<{ success: boolean; data: { project: Project } }> {
    const response = await api.post('/api/projects', data);
    return response.data;
  },

  async updateProject(id: string, data: UpdateProjectRequest): Promise<{ success: boolean; data: { project: Project } }> {
    const response = await api.put(`/api/projects/${id}`, data);
    return response.data;
  },

  async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/api/projects/${id}`);
    return response.data;
  },
};
