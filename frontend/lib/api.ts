// API client utilities for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Important for OAuth2 cookies
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async getAll<T>(endpoint: string): Promise<T[]> {
    return this.request<T[]>(endpoint);
  }

  async getById<T>(endpoint: string, id: number): Promise<T> {
    return this.request<T>(`${endpoint}/${id}`);
  }

  async create<T>(endpoint: string, data: Partial<T>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update<T>(endpoint: string, id: number, data: Partial<T>): Promise<T> {
    return this.request<T>(`${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string, id: number): Promise<void> {
    await this.request<void>(`${endpoint}/${id}`, {
      method: 'DELETE',
    });
  }

  async getCurrentUser() {
    return this.request<any>('/api/user');
  }
}

export const apiClient = new ApiClient();
