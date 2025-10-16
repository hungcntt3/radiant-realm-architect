import api from '@/lib/api';

export interface About {
  id: string;
  user_id: string;
  introduction: string;
  highlights?: string[];
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateAboutRequest {
  introduction: string;
  highlights?: string[];
  image?: string;
}

export const aboutService = {
  async getAbout(): Promise<{ success: boolean; data: { about: About } }> {
    const response = await api.get('/api/about');
    return response.data;
  },

  async getAboutByUserId(userId: string): Promise<{ success: boolean; data: { about: About } }> {
    const response = await api.get(`/api/about/${userId}`);
    return response.data;
  },

  async updateAbout(data: UpdateAboutRequest): Promise<{ success: boolean; data: { about: About } }> {
    const response = await api.put('/api/about', data);
    return response.data;
  },

  async deleteAbout(): Promise<{ success: boolean; message: string }> {
    const response = await api.delete('/api/about');
    return response.data;
  },
};
