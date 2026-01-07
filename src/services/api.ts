import type { Doctor, Prescription, UserStats } from '../types';

// Mock Data
const MOCK_DOCTORS: Doctor[] = [
    { id: '1', name: 'Dr. Olawale O.', specialty: 'Obstetrics', rating: 5.0, image: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Dr. Nguyen B.', specialty: 'Cardiology', rating: 4.8, image: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Dr. Anthony C.', specialty: 'Pediatrics', rating: 4.9, image: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Dr. Chinedum A.', specialty: 'Neurology', rating: 5.0, image: 'https://i.pravatar.cc/150?u=4' },
];

const MOCK_PRESCRIPTIONS: Prescription[] = [
    { id: '101', medication: 'Lisinopril', type: 'Cardiology', doctor: 'Dr. Esther Howard', date: '2024-08-27T15:08:00', status: 'Pending' },
    { id: '102', medication: 'Amoxicillin', type: 'General Practice', doctor: 'Dr. Esther Howard', date: '2024-08-27T15:08:00', status: 'Fulfilled' },
    { id: '103', medication: 'Metformin', type: 'Endocrinology', doctor: 'Dr. Esther Howard', date: '2024-08-21T15:08:00', status: 'Fulfilled' },
];

const MOCK_STATS: UserStats = {
    fulfilledPrescriptions: 24,
    nextAppointment: 1,
    pendingActions: 3,
};

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    getDoctors: async (): Promise<Doctor[]> => {
        await delay(800);
        return MOCK_DOCTORS;
    },

    getPrescriptions: async (): Promise<Prescription[]> => {
        await delay(1000); // Simulate slightly longer load
        return MOCK_PRESCRIPTIONS;
    },

    getStats: async (): Promise<UserStats> => {
        await delay(500);
        return MOCK_STATS;
    }
};
