import { useQuery } from '@tanstack/react-query';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StatsSection } from '../components/dashboard/StatsSection';
import { ServiceActions } from '../components/dashboard/ServiceActions';
import { RecentPrescriptions } from '../components/dashboard/RecentPrescriptions';
import { HealthTips } from '../components/dashboard/HealthTips';
import { api } from '../services/api';

const DashboardPage = () => {
    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: api.getStats
    });

    const { data: prescriptions, isLoading: presLoading } = useQuery({
        queryKey: ['prescriptions'],
        queryFn: api.getPrescriptions
    });

    return (
        <DashboardLayout>
            <Container maxWidth="md" disableGutters>
                <Box sx={{ pb: 4 }}>
                    {/* Stats Row */}
                    <StatsSection
                        fulfilled={stats?.fulfilledPrescriptions}
                        appointment={stats?.nextAppointment}
                        loading={statsLoading}
                    />

                    {/* Service Actions */}
                    <ServiceActions />

                    {/* Recent Prescriptions */}
                    <RecentPrescriptions
                        data={prescriptions}
                        isLoading={presLoading}
                    />

                    {/* Health Tips */}
                    <HealthTips />
                </Box>
            </Container>
        </DashboardLayout>
    );
};

export default DashboardPage;
