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
