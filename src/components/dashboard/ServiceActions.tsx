import { Paper, Typography, Box, Stack } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

const ActionCard = ({ title, subtitle, icon, color }: any) => (
    <Paper
        elevation={0}
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 140,
            borderRadius: 4,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            border: '1px solid #F0F0F0',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0px 10px 20px rgba(0,0,0,0.05)'
            }
        }}
    >
        <Box sx={{ mb: 2 }}>
            {/* Placeholder for illustration */}
            <Box sx={{ width: 40, height: 40, bgcolor: color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                {icon}
            </Box>
        </Box>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
            {subtitle}
        </Typography>
    </Paper>
);

export const ServiceActions = () => {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
            <Box flex={1}>
                <ActionCard
                    title="Consult with a Doctor"
                    subtitle="Connect with licensed doctors anytime, anywhere."
                    icon={<MedicalServicesIcon sx={{ color: 'white' }} />}
                    color="#4CAF50"
                />
            </Box>
            <Box flex={1}>
                <ActionCard
                    title="Buy Drugs + Delivery"
                    subtitle="Order and receive your medication with ease."
                    icon={<DeliveryDiningIcon sx={{ color: 'white' }} />}
                    color="#FF9800"
                />
            </Box>
        </Stack>
    );
};
