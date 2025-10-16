import api from '@/lib/api';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  message: string;
}

export const contactService = {
  async getMessages(): Promise<{ success: boolean; data: { messages: ContactMessage[] } }> {
    const response = await api.get('/api/contact');
    return response.data;
  },

  async getMessageById(id: string): Promise<{ success: boolean; data: { message: ContactMessage } }> {
    const response = await api.get(`/api/contact/${id}`);
    return response.data;
  },

  async createMessage(data: CreateContactRequest): Promise<{ success: boolean; data: { message: ContactMessage } }> {
    const response = await api.post('/api/contact', data);
    return response.data;
  },

  async markAsRead(id: string): Promise<{ success: boolean; data: { message: ContactMessage } }> {
    const response = await api.patch(`/api/contact/${id}/read`);
    return response.data;
  },

  async markAsReplied(id: string): Promise<{ success: boolean; data: { message: ContactMessage } }> {
    const response = await api.patch(`/api/contact/${id}/replied`);
    return response.data;
  },

  async deleteMessage(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/api/contact/${id}`);
    return response.data;
  },
};
