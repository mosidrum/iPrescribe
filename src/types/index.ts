export interface DashboardStat {
    label: string;
    value: number;
    trend: number;
    trendLabel: string;
    icon: 'patients' | 'doctors' | 'reviews' | 'consultations' | 'prescriptions' | 'default';
}

export interface ChartDataPoint {
    label: string;
    value: number;
    value2?: number;
}

export interface RecentPatient {
    id: string;
    signUpDate: string;
    name: string;
    email: string;
    phone: string;
    lastSeen: string;
    location: string;
    device: string;
    status: 'Verified' | 'Pending' | 'Rejected';
    avatar?: string;
}

export interface DashboardData {
    stats: DashboardStat[];
    consultationTrend: ChartDataPoint[];
    prescriptionTrend: ChartDataPoint[];
    doctorVsPatient: ChartDataPoint[];
    specialties: ChartDataPoint[];
    recentPatients: RecentPatient[];
}

// API Response Types
export interface LoginResponse {
    status: number;
    message: string;
    token: string;
    token_type: string;
    data: Record<string, unknown>;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export interface StatsApiResponse {
    patients: {
        total_patients: number;
        patients_percentage_since_last_week: number;
        positive: boolean;
    };
    doctors: {
        total_doctors: number;
        doctors_percentage_since_last_week: number;
        positive: boolean;
    };
    pending_reviews: {
        total_pending_reviews: number;
        pending_reviews_percentage_since_last_week: number;
        positive: boolean;
    };
    consultations: {
        total_consultations: number;
        consultations_percentage_since_last_week: number;
        positive: boolean;
    };
    prescriptions: {
        total_prescriptions: number;
        prescriptions_percentage_since_last_week: number;
        positive: boolean;
    };
    active_doctors_vs_patients: {
        categories: string[];
        series: Array<{
            name: string;
            data: number[];
        }>;
    };
    consultationOverTime: Array<{
        month: string;
        count: number;
    }>;
    prescriptionVolumeTrend: Array<{
        month: string;
        count: number;
    }>;
    top_specialities_in_demand: Array<{
        speciality: string;
        count: number;
    }>;
}

export interface PatientUser {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    state: string | null;
    lga: string | null;
    devices: Array<{
        platform: string;
    }>;
}

export interface PatientApiData {
    id: number;
    first_name: string | null;
    middle_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    created_at: string;
    last_seen: string | null;
    status: string;
    state: string | null;
    lga: string | null;
    user: PatientUser;
}

export interface PatientsApiResponse {
    current_page: number;
    data: PatientApiData[];
    total: number;
}
