import type { 
    DashboardStat, 
    RecentPatient, 
    ChartDataPoint,
    LoginResponse,
    ApiResponse,
    StatsApiResponse,
    PatientsApiResponse
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://stagingapi.iprescribe.online/api/v1';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || 10000);

interface RequestOptions {
    headers?: Record<string, string>;
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const token = localStorage.getItem('auth_token');

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers,
            },
            signal: AbortSignal.timeout(API_TIMEOUT),
            ...options,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
            }
            
            const error = new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
            (error as any).status = response.status;
            (error as any).data = errorData;
            throw error;
        }

        return response.json();
    }

    get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
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
        const response = await apiClient.get<ApiResponse<StatsApiResponse>>('/admin/dashboard/stats');
        const data = response.data;
        
        return [
            {
                label: 'Total Patients',
                value: data.patients.total_patients,
                trend: data.patients.patients_percentage_since_last_week / 100,
                trendLabel: 'Since last week',
                icon: 'patients'
            },
            {
                label: 'Total Doctors',
                value: data.doctors.total_doctors,
                trend: data.doctors.doctors_percentage_since_last_week / 100,
                trendLabel: 'Since last week',
                icon: 'doctors'
            },
            {
                label: 'Pending Reviews',
                value: data.pending_reviews.total_pending_reviews,
                trend: data.pending_reviews.pending_reviews_percentage_since_last_week / 100,
                trendLabel: 'Since last week',
                icon: 'reviews'
            },
            {
                label: 'Total Consultations',
                value: data.consultations.total_consultations,
                trend: data.consultations.consultations_percentage_since_last_week / 100,
                trendLabel: 'Since last week',
                icon: 'consultations'
            },
            {
                label: 'Prescriptions Issued',
                value: data.prescriptions.total_prescriptions,
                trend: data.prescriptions.prescriptions_percentage_since_last_week / 100,
                trendLabel: 'Since last week',
                icon: 'prescriptions'
            }
        ];
    },

    getRecentPatients: async (limit: number = 10): Promise<RecentPatient[]> => {
        const response = await apiClient.get<ApiResponse<PatientsApiResponse>>(`/admin/patients?limit=${limit}`);
        const patients = response.data.data;
        
        return patients.map((patient) => ({
            id: patient.id.toString(),
            signUpDate: patient.created_at,
            name: [patient.first_name, patient.middle_name, patient.last_name]
                .filter(Boolean)
                .join(' ') || 
                [patient.user?.first_name, patient.user?.last_name]
                .filter(Boolean)
                .join(' ') || 'N/A',
            email: patient.email || patient.user?.email || 'N/A',
            phone: patient.phone || patient.user?.phone || 'N/A',
            lastSeen: patient.last_seen || 'Never',
            location: [patient.lga, patient.state].filter(Boolean).join(', ') || 
                     [patient.user?.lga, patient.user?.state].filter(Boolean).join(', ') || 'N/A',
            device: patient.user?.devices?.[0]?.platform || 'Unknown',
            status: patient.status === 'pending' ? 'Pending' : 
                   patient.status === 'verified' ? 'Verified' : 'Pending'
        }));
    },

    getConsultationTrend: async (): Promise<ChartDataPoint[]> => {
        const response = await apiClient.get<ApiResponse<StatsApiResponse>>('/admin/dashboard/stats');
        const consultationData = response.data.consultationOverTime;
        
        return consultationData.map((item) => ({
            label: item.month,
            value: item.count
        }));
    },

    getPrescriptionTrend: async (): Promise<ChartDataPoint[]> => {
        const response = await apiClient.get<ApiResponse<StatsApiResponse>>('/admin/dashboard/stats');
        const prescriptionData = response.data.prescriptionVolumeTrend;
        
        return prescriptionData.map((item) => ({
            label: item.month,
            value: item.count
        }));
    },

    getDoctorVsPatient: async (): Promise<ChartDataPoint[]> => {
        const response = await apiClient.get<ApiResponse<StatsApiResponse>>('/admin/dashboard/stats');
        const doctorPatientData = response.data.active_doctors_vs_patients;
        
        return doctorPatientData.categories.map((category, index) => ({
            label: category,
            value: doctorPatientData.series[0].data[index] || 0,
            value2: doctorPatientData.series[1].data[index] || 0
        }));
    },

    getSpecialties: async (): Promise<ChartDataPoint[]> => {
        const response = await apiClient.get<ApiResponse<StatsApiResponse>>('/admin/dashboard/stats');
        const specialtiesData = response.data.top_specialities_in_demand;
        
        return specialtiesData.map((item) => ({
            label: item.speciality,
            value: item.count
        }));
    },
};

export const authApi = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const loginData = {
            email: email.trim(),
            password: password,
            device_type: 'web',
            app_version: '1.0.0'
        };
        
        return await apiClient.post<LoginResponse>('/auth/login', loginData);
    }
};

export { API_BASE_URL };