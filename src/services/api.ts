import type { Doctor, Prescription, UserStats, DashboardData, DashboardStat, RecentPatient } from '../types';

// Helpers
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const api = {
    getDashboardData: async (limit: number = 5, _startDate?: Date | null, _endDate?: Date | null): Promise<DashboardData> => {
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 800));

        // Generate dynamic stats with randomization to simulate "different data" on range change
        const stats: DashboardStat[] = [
            { label: 'Total Patients', value: randomInt(10, 100), trend: -0.10, trendLabel: 'Since last week', icon: 'patients' },
            { label: 'Total Doctors', value: randomInt(5, 50), trend: randomInt(-5, 5) / 100, trendLabel: 'Since last week', icon: 'doctors' },
            { label: 'Pending Reviews', value: randomInt(0, 20), trend: -0.10, trendLabel: 'Since last week', icon: 'reviews' },
            { label: 'Total Consultations', value: randomInt(100, 500), trend: 0.05, trendLabel: 'Since last week', icon: 'consultations' },
            { label: 'Prescriptions Issued', value: randomInt(50, 300), trend: 0.12, trendLabel: 'Since last week', icon: 'prescriptions' },
        ];

        // Generate Charts Data
        const consultationTrend = months.map(m => ({ label: m, value: randomInt(30, 150) }));
        const prescriptionTrend = months.map(m => ({ label: m, value: randomInt(40, 200) }));
        const doctorVsPatient = months.map(m => ({ label: m, value: randomInt(20, 100), value2: randomInt(40, 150) }));

        const specialties = [
            { label: 'Cardiology', value: randomInt(20, 40) },
            { label: 'Pediatrics', value: randomInt(30, 50) },
            { label: 'Surgery', value: randomInt(10, 25) },
            { label: 'Others', value: randomInt(5, 15) },
        ];

        // Generate Recent Patients
        // Generate exactly 'limit' number of records
        const recentPatients: RecentPatient[] = Array.from({ length: limit }).map((_, i) => ({
            id: String(i + 1),
            signUpDate: `2024-09-${randomInt(1, 30).toString().padStart(2, '0')}`,
            name: ['Isagi Yoichi', 'Esther Howard', 'Jenny Wilson', 'Guy Hawkins', 'Jacob Jones', 'Robert Fox', 'Cody Fisher', 'Albert Flores', 'Marvin McKinney', 'Jerome Bell'][i % 10] + (i > 9 ? ` ${i}` : ''),
            email: `user${i}@example.com`,
            phone: `(555) 555-${String(i).padStart(4, '0')}`,
            lastSeen: `2024-09-05 15:30:37`,
            location: ['Lagos', 'Abuja', 'Sokoto', 'Kaduna', 'Ogun'][i % 5],
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
