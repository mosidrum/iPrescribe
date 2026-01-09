import { useQuery, useQueries } from '@tanstack/react-query';
import { dashboardApi } from '../services/api';
import { useDashboardStore } from '../store/useDashboardStore';

// API Configuration
const API_RETRY_ATTEMPTS = parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '2');

// Query keys for consistent caching
export const dashboardQueryKeys = {
    all: ['dashboard'] as const,
    stats: () => [...dashboardQueryKeys.all, 'stats'] as const,
    recentPatients: (limit: number) => [...dashboardQueryKeys.all, 'recent-patients', limit] as const,
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

export const useRecentPatients = (limit: number = 5) => {
    return useQuery({
        queryKey: dashboardQueryKeys.recentPatients(limit),
        queryFn: () => dashboardApi.getRecentPatients(limit),
        staleTime: 2 * 60 * 1000, // 2 minutes (more frequent updates for recent data)
        gcTime: 5 * 60 * 1000,
        retry: API_RETRY_ATTEMPTS,
    });
};

// Combined hook, now just effectively parallel using individual hooks
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
        ],
    });

    const [statsQuery, recentPatientsQuery] = queries;

    return {
        stats: statsQuery.data || [],
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