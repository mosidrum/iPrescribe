import { Paper, Stack, Typography, Box, Skeleton } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';

interface StatBlockProps {
    label: string;
    value: number | undefined;
    icon: React.ReactNode;
    color: string;
    loading?: boolean;
}

const StatBlock = ({ label, value, icon, color, loading }: StatBlockProps) => (
    <Paper
        elevation={0}
        sx={{
            p: 2,
            bgcolor: '#FFFFFF',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #F0F0F0',
            width: '100%',
            // minWidth: 200
        }}
    >
        <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {label}
            </Typography>
            {loading ? (
                <Skeleton width={40} height={40} />
            ) : (
                <Typography variant="h4" fontWeight={700}>
                    {value}
                </Typography>
            )}
        </Box>
        <Box sx={{ p: 1, bgcolor: color, borderRadius: 2, color: 'white' }}>
            {icon}
        </Box>
    </Paper>
);

interface StatsProps {
    fulfilled?: number;
    appointment?: number;
    loading?: boolean;
}

export const StatsSection = ({ fulfilled, appointment, loading }: StatsProps) => {
    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
            <StatBlock
                label="Fulfilled Prescriptions"
                value={fulfilled}
                icon={<AssignmentIcon />}
                color="#E3F2FD" // Light Blue
                loading={loading}
            />

            <StatBlock
                label="Next Appointment"
                value={appointment}
                icon={<EventIcon />}
                color="#FFF3E0" // Light Orange
                loading={loading}
            />
        </Stack>
        /* Note: In the design these often look merged or very close, 
           but for clean implementation separate cards works well unless strict merge requested.
           The design shows them side-by-side.
           Actually, re-checking design (Img 0): "Fulfilled Prescriptions 24" (Blue icon), "Next Appointment 1" (Orange icon). 
           The component above does this. I'll adjust colors to match design icons better.
           It seems the background is white, but the icon has a subtle background.
        */
    );
};
