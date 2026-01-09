import type { DashboardData, DashboardStat, RecentPatient } from '../types';

// iPrescribe API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://stagingapi.iprescribe.online/api/v1';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');
const API_RETRY_ATTEMPTS = parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '2');

// API Client with error handling
class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
            signal: AbortSignal.timeout(API_TIMEOUT),
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`API Request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', headers });
    }

    async post<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            headers,
        });
    }
}

const apiClient = new ApiClient(API_BASE_URL);

// Dashboard API endpoints
export const dashboardApi = {
    // Get dashboard statistics
    getStats: async (): Promise<DashboardStat[]> => {
        try {
            // Try to fetch from real API first
            const response = await apiClient.get<any>('/dashboard/stats');
            
            // Transform API response to match our interface
            return response.data || response.stats || [];
        } catch (error) {
            console.warn('Failed to fetch real stats, using fallback data:', error);
            
            // Fallback to mock data if API fails
            return [
                { label: 'Total Patients', value: 10, trend: -0.10, trendLabel: 'Since last week', icon: 'patients' },
                { label: 'Total Doctors', value: 5, trend: -0.10, trendLabel: 'Since last week', icon: 'doctors' },
                { label: 'Pending Reviews', value: 3, trend: -0.10, trendLabel: 'Since last week', icon: 'reviews' },
                { label: 'Total Consultations', value: 0, trend: -0.10, trendLabel: 'Since last week', icon: 'consultations' },
                { label: 'Prescriptions Issued', value: 0, trend: -0.10, trendLabel: 'Since last week', icon: 'prescriptions' },
            ];
        }
    },

    // Get consultation trends
    getConsultationTrend: async (): Promise<{ label: string; value: number }[]> => {
        try {
            const response = await apiClient.get<any>('/dashboard/consultation-trend');
            return response.data || response.trend || [];
        } catch (error) {
            console.warn('Failed to fetch consultation trend, using fallback data:', error);
            
            // Fallback mock data
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months.map(m => ({ label: m, value: Math.floor(Math.random() * 100) + 20 }));
        }
    },

    // Get prescription trends
    getPrescriptionTrend: async (): Promise<{ label: string; value: number }[]> => {
        try {
            const response = await apiClient.get<any>('/dashboard/prescription-trend');
            return response.data || response.trend || [];
        } catch (error) {
            console.warn('Failed to fetch prescription trend, using fallback data:', error);
            
            // Fallback mock data
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months.map(m => ({ label: m, value: Math.floor(Math.random() * 80) + 40 }));
        }
    },

    // Get doctor vs patient data
    getDoctorVsPatient: async (): Promise<{ label: string; value: number; value2: number }[]> => {
        try {
            const response = await apiClient.get<any>('/dashboard/doctor-patient-comparison');
            return response.data || response.comparison || [];
        } catch (error) {
            console.warn('Failed to fetch doctor vs patient data, using fallback data:', error);
            
            // Fallback mock data
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months.map(m => ({ 
                label: m, 
                value: Math.floor(Math.random() * 80) + 20, 
                value2: Math.floor(Math.random() * 120) + 40 
            }));
        }
    },

    // Get specialties data
    getSpecialties: async (): Promise<{ label: string; value: number }[]> => {
        try {
            const response = await apiClient.get<any>('/dashboard/specialties');
            return response.data || response.specialties || [];
        } catch (error) {
            console.warn('Failed to fetch specialties data, using fallback data:', error);
            
            // Fallback mock data
            return [
                { label: 'Cardiology', value: 45 },
                { label: 'Pediatrics', value: 30 },
                { label: 'Surgery', value: 15 },
                { label: 'Others', value: 10 },
            ];
        }
    },

    // Get recent patients
    getRecentPatients: async (limit: number = 5): Promise<RecentPatient[]> => {
        try {
            const response = await apiClient.get<any>(`/dashboard/recent-patients?limit=${limit}`);
            return response.data || response.patients || [];
        } catch (error) {
            console.warn('Failed to fetch recent patients, using fallback data:', error);
            
            // Fallback mock data
            return Array.from({ length: limit }).map((_, i) => ({
                id: String(i + 1),
                signUpDate: `2024-09-${Math.floor(Math.random() * 30) + 1}`,
                name: ['Isagi Yoichi', 'Esther Howard', 'Jenny Wilson', 'Guy Hawkins', 'Jacob Jones'][i % 5],
                email: `user${i + 1}@example.com`,
                phone: `(704) 555-01${i + 27}`,
                lastSeen: '2024-09-05 15:30:37',
                location: ['Lagos', 'Abuja', 'Sokoto', 'Kaduna', 'Ogun'][i % 5],
                device: i % 2 === 0 ? 'iOS' : 'Android',
                status: 'Verified',
            }));
        }
    },
};

// Combined dashboard data fetcher (for backward compatibility)
export const api = {
    getDashboardData: async (limit: number = 5): Promise<DashboardData> => {
        try {
            // Fetch all dashboard data concurrently
            const [
                stats,
                consultationTrend,
                prescriptionTrend,
                doctorVsPatient,
                specialties,
                recentPatients
            ] = await Promise.all([
                dashboardApi.getStats(),
                dashboardApi.getConsultationTrend(),
                dashboardApi.getPrescriptionTrend(),
                dashboardApi.getDoctorVsPatient(),
                dashboardApi.getSpecialties(),
                dashboardApi.getRecentPatients(limit),
            ]);

            return {
                stats,
                consultationTrend,
                prescriptionTrend,
                doctorVsPatient,
                specialties,
                recentPatients,
            };
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            throw error;
        }
    },
};

// Export individual API functions for use with TanStack React Query
export { apiClient, API_BASE_URL };