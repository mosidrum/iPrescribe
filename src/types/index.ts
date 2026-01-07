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
