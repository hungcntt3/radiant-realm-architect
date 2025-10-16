import api from '@/lib/api';

export interface Skill {
  id: string;
  user_id: string;
  name: string;
  level: number; // 1-100
  icon?: string;
  category: string;
  created_at: string;
}

export interface CreateSkillRequest {
  name: string;
  level: number;
  icon?: string;
  category: string;
}

export interface UpdateSkillRequest extends Partial<CreateSkillRequest> {}

export interface GetSkillsParams {
  category?: string;
  sortBy?: 'name' | 'level' | 'created_at';
  sortOrder?: 'ASC' | 'DESC';
}

export const skillService = {
  async getSkills(params?: GetSkillsParams): Promise<{ success: boolean; data: { skills: Skill[] } }> {
    const response = await api.get('/api/skills', { params });
    return response.data;
  },

  async getSkillById(id: string): Promise<{ success: boolean; data: { skill: Skill } }> {
    const response = await api.get(`/api/skills/${id}`);
    return response.data;
  },

  async getSkillsByUserId(userId: string): Promise<{ success: boolean; data: { skills: Skill[] } }> {
    const response = await api.get(`/api/skills/user/${userId}`);
    return response.data;
  },

  async getSkillsByCategory(): Promise<{ 
    success: boolean; 
    data: { 
      skillsByCategory: Record<string, Skill[]> 
    } 
  }> {
    const response = await api.get('/api/skills/category');
    return response.data;
  },

  async createSkill(data: CreateSkillRequest): Promise<{ success: boolean; data: { skill: Skill } }> {
    const response = await api.post('/api/skills', data);
    return response.data;
  },

  async updateSkill(id: string, data: UpdateSkillRequest): Promise<{ success: boolean; data: { skill: Skill } }> {
    const response = await api.put(`/api/skills/${id}`, data);
    return response.data;
  },

  async deleteSkill(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/api/skills/${id}`);
    return response.data;
  },
};
