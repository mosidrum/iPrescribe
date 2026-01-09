import { useQuery, useQueries } from '@tanstack/react-query';
import { dashboardApi, api } from '../services/api';
import { useDashboardStore } from '../store/useDashboardStore';

// API Configuration
const API_RETRY_ATTEMPTS = parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '2');

// Query keys for consistent caching
export const dashboardQueryKeys = {
    all: ['dashboard'] as const,
    stats: () => [...dashboardQueryKeys.all, 'stats'] as const,
    consultationTrend: () => [...dashboardQueryKeys.all, 'consultation-trend'] as const,
    prescriptionTrend: () => [...dashboardQueryKeys.all, 'prescription-trend'] as const,
    doctorVsPatient: () => [...dashboardQueryKeys.all, 'doctor-vs-patient'] as const,
    specialties: () => [...dashboardQueryKeys.all, 'specialties'] as const,
    recentPatients: (limit: number) => [...dashboardQueryKeys.all, 'recent-patients', limit] as const,
    combined: (limit: number) => [...dashboardQueryKeys.all, 'combined', limit] as const,
};

// Individual hooks for specific data
export const useDashboardStats = () => {
    return useQuery({
        queryKey: dashboardQueryKeys.stats(),
        queryFn: dashboardApi.getStats,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: API_RETRY_ATTEMPTS,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
};

export const useConsultationTrend = () => {
    return useQuery({
        queryKey: dashboardQueryKeys.consultationTrend(),
        queryFn: dashboardApi.getConsultationTrend,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: API_RETRY_ATTEMPTS,
    });
};

export const usePrescriptionTrend = () => {
    return useQuery({
        queryKey: dashboardQueryKeys.prescriptionTrend(),
        queryFn: dashboardApi.getPrescriptionTrend,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: API_RETRY_ATTEMPTS,
    });
};

export const useDoctorVsPatient = () => {
    return useQuery({
        queryKey: dashboardQueryKeys.doctorVsPatient(),
        queryFn: dashboardApi.getDoctorVsPatient,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: API_RETRY_ATTEMPTS,
    });
};

export const useSpecialties = () => {
    return useQuery({
        queryKey: dashboardQueryKeys.specialties(),
        queryFn: dashboardApi.getSpecialties,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: API_RETRY_ATTEMPTS,
    });
};

export const useRecentPatients = (limit: number = 5) => {
    return useQuery({
        queryKey: dashboardQueryKeys.recentPatients(limit),
        queryFn: () => dashboardApi.getRecentPatients(limit),
        staleTime: 2 * 60 * 1000, // 2 minutes (more frequent updates for recent data)
        gcTime: 5 * 60 * 1000,
        retry: API_RETRY_ATTEMPTS,
    });
};

// Combined hook for all dashboard data (backward compatibility)
export const useDashboardData = () => {
    const { limit } = useDashboardStore();
    
    return useQuery({
        queryKey: dashboardQueryKeys.combined(limit),
        queryFn: () => api.getDashboardData(limit),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: API_RETRY_ATTEMPTS,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
};

// Parallel queries hook for better performance
export const useDashboardDataParallel = () => {
    const { limit } = useDashboardStore();
    
    const queries = useQueries({
        queries: [
            {
                queryKey: dashboardQueryKeys.stats(),
                queryFn: dashboardApi.getStats,
                staleTime: 5 * 60 * 1000,
                retry: API_RETRY_ATTEMPTS,
            },
            {
                queryKey: dashboardQueryKeys.consultationTrend(),
                queryFn: dashboardApi.getConsultationTrend,
                staleTime: 5 * 60 * 1000,
                retry: API_RETRY_ATTEMPTS,
            },
            {
                queryKey: dashboardQueryKeys.prescriptionTrend(),
                queryFn: dashboardApi.getPrescriptionTrend,
                staleTime: 5 * 60 * 1000,
                retry: API_RETRY_ATTEMPTS,
            },
            {
                queryKey: dashboardQueryKeys.doctorVsPatient(),
                queryFn: dashboardApi.getDoctorVsPatient,
                staleTime: 5 * 60 * 1000,
                retry: API_RETRY_ATTEMPTS,
            },
            {
                queryKey: dashboardQueryKeys.specialties(),
                queryFn: dashboardApi.getSpecialties,
                staleTime: 5 * 60 * 1000,
                retry: API_RETRY_ATTEMPTS,
            },
            {
                queryKey: dashboardQueryKeys.recentPatients(limit),
                queryFn: () => dashboardApi.getRecentPatients(limit),
                staleTime: 2 * 60 * 1000,
                retry: API_RETRY_ATTEMPTS,
            },
        ],
    });

    const [
        statsQuery,
        consultationTrendQuery,
        prescriptionTrendQuery,
        doctorVsPatientQuery,
        specialtiesQuery,
        recentPatientsQuery,
    ] = queries;

    return {
        stats: statsQuery.data || [],
        consultationTrend: consultationTrendQuery.data || [],
        prescriptionTrend: prescriptionTrendQuery.data || [],
        doctorVsPatient: doctorVsPatientQuery.data || [],
        specialties: specialtiesQuery.data || [],
        recentPatients: recentPatientsQuery.data || [],
        isLoading: queries.some(query => query.isLoading),
        isError: queries.some(query => query.isError),
        error: queries.find(query => query.error)?.error,
        refetch: () => queries.forEach(query => query.refetch()),
    };
};

// Hook for refreshing all dashboard data
export const useRefreshDashboard = () => {
    return {
        refreshAll: async () => {
            // This would typically use queryClient.invalidateQueries
            // but for now we'll use the individual refetch methods
            window.location.reload(); // Simple refresh for demo
        },
        refreshStats: () => {
            // Individual refresh methods can be implemented here
        },
    };
};