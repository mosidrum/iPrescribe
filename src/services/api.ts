import type { Doctor, Prescription, UserStats, DashboardData, DashboardStat, RecentPatient } from '../types';

// Helpers
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const api = {
    getDashboardData: async (): Promise<DashboardData> => {
        await new Promise(resolve => setTimeout(resolve, 800));

        // Generate dynamic stats
        const stats: DashboardStat[] = [
            { label: 'Total Patients', value: randomInt(10, 50), trend: -0.10, trendLabel: 'Since last week', icon: 'patients' },
            { label: 'Total Doctors', value: randomInt(5, 20), trend: -0.10, trendLabel: 'Since last week', icon: 'doctors' },
            { label: 'Pending Reviews', value: randomInt(0, 10), trend: -0.10, trendLabel: 'Since last week', icon: 'reviews' },
            { label: 'Total Consultations', value: 0, trend: -0.10, trendLabel: 'Since last week', icon: 'consultations' },
            { label: 'Prescriptions Issued', value: 0, trend: -0.10, trendLabel: 'Since last week', icon: 'prescriptions' },
        ];

        // Generate Charts Data
        const consultationTrend = months.map(m => ({ label: m, value: randomInt(30, 80) }));
        const prescriptionTrend = months.map(m => ({ label: m, value: randomInt(40, 90) }));
        const doctorVsPatient = months.map(m => ({ label: m, value: randomInt(20, 70), value2: randomInt(40, 100) }));

        const specialties = [
            { label: 'Cardiology', value: 30 },
            { label: 'Pediatrics', value: 45 },
            { label: 'Surgery', value: 15 },
            { label: 'Others', value: 10 },
        ];

        // Generate Recent Patients
        const recentPatients: RecentPatient[] = Array.from({ length: 5 }).map((_, i) => ({
            id: String(i + 1),
            signUpDate: `2024-09-${randomInt(1, 30).toString().padStart(2, '0')}`,
            name: ['Isagi Yoichi', 'Esther Howard', 'Jenny Wilson', 'Guy Hawkins', 'Jacob Jones'][i] || 'User Name',
            email: ['isagi.yoichi@example.com', 'sara.cruz@example.com', 'felicia.reid@example.com', 'tanya.hill@example.com', 'jacob@example.com'][i],
            phone: `(555) 555-010${i}`,
            lastSeen: `2024-09-05 15:30:37`,
            location: ['Lagos', 'Abuja', 'Sokoto', 'Kaduna', 'Ogun'][i],
            device: i % 2 === 0 ? 'iOS' : 'Android',
            status: 'Verified',
        }));

        return {
            stats,
            consultationTrend,
            prescriptionTrend,
            doctorVsPatient,
            specialties,
            recentPatients
        };
    },

    // Legacy mock methods
    getDoctors: async (): Promise<Doctor[]> => [],
    getPrescriptions: async (): Promise<Prescription[]> => [],
    getStats: async (): Promise<UserStats> => ({ fulfilledPrescriptions: 0, nextAppointment: 0, pendingActions: 0 })
};
