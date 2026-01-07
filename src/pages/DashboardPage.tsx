import { useQuery } from '@tanstack/react-query';
import { Grid, Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { ChartWidget } from '../components/dashboard/Charts';
import { RecentPatients } from '../components/dashboard/RecentPatients';
import { api } from '../services/api';
import { useDashboardStore } from '../store/useDashboardStore';

const DashboardPage = () => {
    const { limit, dateRange } = useDashboardStore();

    const { data, isLoading } = useQuery({
        queryKey: ['dashboard-data', limit, dateRange],
        queryFn: () => api.getDashboardData(limit),
        staleTime: 0, // Ensure fresh data on param change if desired, though queryKey handles it
    });

    const stats = data?.stats || [];

    return (
        <DashboardLayout>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                <Grid container spacing={3}>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={i}>
                                <StatCard
                                    label="Loading..."
                                    value={0}
                                    trend={0}
                                    trendLabel=""
                                    icon="default"
                                    loading={true}
                                />
                            </Grid>
                        ))
                    ) : (
                        stats.map((stat) => (
                            <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={stat.label}>
                                <StatCard
                                    label={stat.label}
                                    value={stat.value}
                                    trend={stat.trend}
                                    trendLabel={stat.trendLabel}
                                    icon={stat.icon}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ChartWidget
                            title="Consultation Over Time"
                            type="line"
                            data={data?.consultationTrend || []}
                            color="#2E90FA"
                            label="Consultations"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ChartWidget
                            title="Prescription Volume Trend"
                            type="line"
                            data={data?.prescriptionTrend || []}
                            color="#12B76A"
                            label="Prescriptions"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <ChartWidget
                            title="Active Doctors vs Active Patients"
                            type="bar"
                            data={data?.doctorVsPatient || []}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <ChartWidget
                            title="Top Specialties in Demand"
                            type="donut"
                            data={data?.specialties || []}
                            legend={true}
                        />
                    </Grid>
                </Grid>

                {/* Recent Patients Table */}
                <RecentPatients
                    data={data?.recentPatients}
                    isLoading={isLoading}
                />

            </Box>
        </DashboardLayout>
    );
};

export default DashboardPage;
