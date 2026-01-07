import { create } from 'zustand';

interface DashboardState {
    limit: number;
    dateRange: string;
    setDateRange: (range: string) => void;
    setLimit: (limit: number) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    limit: 5,
    dateRange: '12th Sept - 15th Sept, 2025',
    setDateRange: (range) => set({ dateRange: range }),
    setLimit: (limit) => set({ limit }),
}));
