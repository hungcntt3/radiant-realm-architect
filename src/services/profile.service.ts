import api from '@/lib/api';

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  avatar?: string;
  bio?: string;
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
  };
  social_links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    portfolio?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileRequest {
  name?: string;
  avatar?: string;
  bio?: string;
  contact?: Profile['contact'];
  social_links?: Profile['social_links'];
}

export const profileService = {
  async getProfile(): Promise<{ success: boolean; data: { profile: Profile } }> {
    const response = await api.get('/api/profiles');
    return response.data;
  },

  async getProfileByUserId(userId: string): Promise<{ success: boolean; data: { profile: Profile } }> {
    const response = await api.get(`/api/profiles/${userId}`);
    return response.data;
  },

  async updateProfile(data: UpdateProfileRequest): Promise<{ success: boolean; data: { profile: Profile } }> {
    const response = await api.put('/api/profiles', data);
    return response.data;
  },
};
