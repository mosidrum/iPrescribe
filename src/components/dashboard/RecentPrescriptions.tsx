import { Paper, Typography, Box, Stack, Button, Skeleton } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import { type Prescription } from '../../types';

interface PrescriptionListProps {
    data: Prescription[] | undefined;
    isLoading: boolean;
}

const PrescriptionCard = ({ item }: { item: Prescription }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Fulfilled': return { color: '#4CAF50', bg: '#E8F5E9' };
            case 'Pending': return { color: '#FF9800', bg: '#FFF3E0' };
            default: return { color: '#757575', bg: '#F5F5F5' };
        }
    };

    const statusStyle = getStatusColor(item.status);
    const date = new Date(item.date).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 2,
                borderRadius: 4,
                border: '1px solid #F5F7FA',
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}
        >
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 3,
                    bgcolor: '#FFF0E6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}
            >
                <MedicationIcon sx={{ color: '#FF7043' }} />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="subtitle1" fontWeight={700}>
                        {item.type}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        }}
                    >
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: statusStyle.color }} />
                        <Typography variant="caption" sx={{ color: statusStyle.color, fontWeight: 600 }}>
                            {item.status}
                        </Typography>
                    </Box>
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Prescribed by: <Box component="span" fontWeight={500}>{item.doctor}</Box>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Date Prescribed: {date}
                </Typography>
            </Box>
        </Paper>
    );
};

export const RecentPrescriptions = ({ data, isLoading }: PrescriptionListProps) => {
    if (isLoading) {
        return (
            <Box>
                {[1, 2].map((i) => <Skeleton key={i} variant="rounded" height={80} sx={{ mb: 2, borderRadius: 4 }} />)}
            </Box>
        )
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={700}>
                    Recent Prescriptions
                </Typography>
                <Button size="small" sx={{ fontWeight: 600 }}>See All</Button>
            </Stack>

            {data?.map((item) => (
                <PrescriptionCard key={item.id} item={item} />
            ))}
        </Box>
    );
};
