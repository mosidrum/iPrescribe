import type { DashboardStat, RecentPatient } from '../types';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'https://stagingapi.iprescribe.online/api/v1';

const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || 10000);

interface LoginResponse {
    status: number;
    message: string;
    token: string;
    token_type: string;
    data: any;
}

type RequestOptions = RequestInit & {
    withAuth?: boolean;
};

class ApiClient {
    constructor(private baseURL: string) { }

    private async request<T>(
        endpoint: string,
        { withAuth = true, headers, ...options }: RequestOptions = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const token = localStorage.getItem('auth_token');

        const requestHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(headers as Record<string, string>),
        };

        if (withAuth && token) {
            requestHeaders['Authorization'] = `Bearer ${token}`;
        }

        const config: RequestInit = {
            ...options,
            headers: requestHeaders,
            signal: AbortSignal.timeout(API_TIMEOUT),
        };

        console.group('API Request');
        console.log('URL:', url);
        console.log('Method:', config.method);
        console.log('Body:', config.body);
        console.log('Headers:', requestHeaders);
        console.groupEnd();

        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Error Response:', errorData);
            throw new Error(
                errorData.message || `API Error: ${response.status} ${response.statusText}`
            );
        }

        return response.json();
    }

    get<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    post<T>(endpoint: string, body?: any, options?: RequestOptions) {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        });
    }
}

export const apiClient = new ApiClient(API_BASE_URL);

export const dashboardApi = {
    getStats: async (): Promise<DashboardStat[]> => {
        const res = await apiClient.get<any>('/admin/dashboard/stats');
        return res.data ?? res;
    },

    getRecentPatients: async (limit = 5): Promise<RecentPatient[]> => {
        const res = await apiClient.get<any>(`/admin/patients?limit=${limit}`);
        return res.data ?? res;
    },
};

export const authApi = {
    login: (email: string, password?: string): Promise<LoginResponse> => {
        return apiClient.post<LoginResponse>(
            '/auth/login',
            { email, password },
            { withAuth: false }
        );
    },
};

export { API_BASE_URL };
