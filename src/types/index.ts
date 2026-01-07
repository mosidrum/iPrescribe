export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    image: string;
}

export interface Prescription {
    id: string;
    medication: string;
    doctor: string;
    date: string;
    status: 'Pending' | 'Fulfilled' | 'Cancelled';
    type: 'Cardiology' | 'General Practice' | 'Endocrinology' | 'Other';
}

export interface UserStats {
    fulfilledPrescriptions: number;
    nextAppointment: number;
    pendingActions: number;
}

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
