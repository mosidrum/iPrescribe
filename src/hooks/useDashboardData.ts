import { useQuery, useQueries } from '@tanstack/react-query';
import { dashboardApi } from '../services/api';
import { useDashboardStore } from '../store/useDashboardStore';

const API_RETRY_ATTEMPTS = parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '2');

export const dashboardQueryKeys = {
    all: ['dashboard'] as const,
    stats: () => [...dashboardQueryKeys.all, 'stats'] as const,
    recentPatients: (limit: number) => [...dashboardQueryKeys.all, 'recent-patients', limit] as const,
    consultationTrend: () => [...dashboardQueryKeys.all, 'consultation-trend'] as const,
    prescriptionTrend: () => [...dashboardQueryKeys.all, 'prescription-trend'] as const,
    doctorVsPatient: () => [...dashboardQueryKeys.all, 'doctor-vs-patient'] as const,
    specialties: () => [...dashboardQueryKeys.all, 'specialties'] as const,
};

export const useDashboardStats = () => {
    return useQuery({
        queryKey: dashboardQueryKeys.stats(),
        queryFn: dashboardApi.getStats,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: API_RETRY_ATTEMPTS,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
};

export const useRecentPatients = (limit: number = 5) => {
    return useQuery({
        queryKey: dashboardQueryKeys.recentPatients(limit),
        queryFn: () => dashboardApi.getRecentPatients(limit),
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: API_RETRY_ATTEMPTS,
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

export const useDashboardData = () => {
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
                queryKey: dashboardQueryKeys.recentPatients(limit),
                queryFn: () => dashboardApi.getRecentPatients(limit),
                staleTime: 2 * 60 * 1000,
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
        ],
    });

    const [
        statsQuery,
        recentPatientsQuery,
        consultationTrendQuery,
        prescriptionTrendQuery,
        doctorVsPatientQuery,
        specialtiesQuery
    ] = queries;

    return {
        stats: statsQuery.data || [],
        recentPatients: recentPatientsQuery.data || [],
        consultationTrend: consultationTrendQuery.data || [],
        prescriptionTrend: prescriptionTrendQuery.data || [],
        doctorVsPatient: doctorVsPatientQuery.data || [],
        specialties: specialtiesQuery.data || [],
        isLoading: queries.some(query => query.isLoading),
        isError: queries.some(query => query.isError),
        error: queries.find(query => query.error)?.error,
        refetch: () => queries.forEach(query => query.refetch()),
    };
};

export const useRefreshDashboard = () => {
    return {
        refreshAll: async () => {
            window.location.reload();
        },
    };
};