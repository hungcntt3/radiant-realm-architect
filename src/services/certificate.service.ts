import api from '@/lib/api';

export interface Certificate {
  id: string;
  user_id: string;
  title: string;
  issuer: string;
  issue_date: string; // YYYY-MM-DD
  credential_url?: string;
  icon?: string;
  created_at: string;
}

export interface CreateCertificateRequest {
  title: string;
  issuer: string;
  issue_date: string; // YYYY-MM-DD
  credential_url?: string;
  icon?: string;
}

export interface UpdateCertificateRequest extends Partial<CreateCertificateRequest> {}

export interface GetCertificatesParams {
  sortBy?: 'issue_date' | 'title' | 'issuer' | 'created_at';
  sortOrder?: 'ASC' | 'DESC';
  issuer?: string;
}

export const certificateService = {
  async getCertificates(params?: GetCertificatesParams): Promise<{ success: boolean; data: { certificates: Certificate[] } }> {
    const response = await api.get('/api/certificates', { params });
    return response.data;
  },

  async getCertificateById(id: string): Promise<{ success: boolean; data: { certificate: Certificate } }> {
    const response = await api.get(`/api/certificates/${id}`);
    return response.data;
  },

  async getCertificatesByUserId(userId: string): Promise<{ success: boolean; data: { certificates: Certificate[] } }> {
    const response = await api.get(`/api/certificates/user/${userId}`);
    return response.data;
  },

  async getCertificatesByIssuer(): Promise<{ 
    success: boolean; 
    data: { 
      certificatesByIssuer: Record<string, Certificate[]> 
    } 
  }> {
    const response = await api.get('/api/certificates/issuers');
    return response.data;
  },

  async getCertificateStats(): Promise<{ 
    success: boolean; 
    data: { 
      stats: {
        totalCertificates: number;
        uniqueIssuers: number;
        thisYearCertificates: number;
        mostRecentIssueDate?: string;
        topIssuers: string[];
      } 
    } 
  }> {
    const response = await api.get('/api/certificates/stats');
    return response.data;
  },

  async searchCertificates(query: string): Promise<{ success: boolean; data: { certificates: Certificate[] } }> {
    const response = await api.get('/api/certificates/search', { params: { query } });
    return response.data;
  },

  async getCertificatesByDateRange(startDate: string, endDate: string): Promise<{ success: boolean; data: { certificates: Certificate[] } }> {
    const response = await api.get('/api/certificates/date-range', { params: { startDate, endDate } });
    return response.data;
  },

  async createCertificate(data: CreateCertificateRequest): Promise<{ success: boolean; data: { certificate: Certificate } }> {
    const response = await api.post('/api/certificates', data);
    return response.data;
  },

  async updateCertificate(id: string, data: UpdateCertificateRequest): Promise<{ success: boolean; data: { certificate: Certificate } }> {
    const response = await api.put(`/api/certificates/${id}`, data);
    return response.data;
  },

  async deleteCertificate(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/api/certificates/${id}`);
    return response.data;
  },
};
