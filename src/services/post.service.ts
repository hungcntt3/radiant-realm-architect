import api from '@/lib/api';

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  cover_image?: string;
  published_at?: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  cover_image?: string;
  tags?: string[];
  status?: 'draft' | 'published';
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  status?: 'draft' | 'published';
  sortBy?: 'created_at' | 'updated_at' | 'title' | 'views';
  sortOrder?: 'ASC' | 'DESC';
  tags?: string;
}

export const postService = {
  async getPosts(params?: GetPostsParams): Promise<{ 
    success: boolean; 
    data: { 
      posts: Post[];
      pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      };
    } 
  }> {
    const response = await api.get('/api/posts', { params });
    return response.data;
  },

  async getPostById(id: string): Promise<{ success: boolean; data: { post: Post } }> {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  },

  async getPostsByUserId(userId: string): Promise<{ success: boolean; data: { posts: Post[] } }> {
    const response = await api.get(`/api/posts/user/${userId}`);
    return response.data;
  },

  async createPost(data: CreatePostRequest): Promise<{ success: boolean; data: { post: Post } }> {
    const response = await api.post('/api/posts', data);
    return response.data;
  },

  async updatePost(id: string, data: UpdatePostRequest): Promise<{ success: boolean; data: { post: Post } }> {
    const response = await api.put(`/api/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/api/posts/${id}`);
    return response.data;
  },

  async incrementViews(id: string): Promise<{ success: boolean; data: { post: Post } }> {
    const response = await api.post(`/api/posts/${id}/increment-views`);
    return response.data;
  },
};
