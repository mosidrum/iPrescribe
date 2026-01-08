import { Paper, Typography, Box, Stack, Skeleton, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import StarIcon from '@mui/icons-material/Star';
import MedicationIcon from '@mui/icons-material/Medication';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { palette } from '../../theme/theme';

const STAT_CONFIG = {
    patients: {
        icon: PeopleIcon,
        cardBg: '#F9F5FF', // Light Lavender
        iconBg: '#F4EBFF', // Slightly darker Lavender
        iconColor: '#7F56D9', // Deep Lavender/Purple
    },
    doctors: {
        icon: LocalHospitalIcon,
        cardBg: '#EFF8FF', // Light Blue
        iconBg: '#D1E9FF',
        iconColor: '#2E90FA', // Blue
    },
    reviews: {
        icon: StarIcon,
        cardBg: '#FFFAEB', // Light Orange/Yellow
        iconBg: '#FEF0C7',
        iconColor: '#F79009', // Orange
    },
    consultations: {
        icon: EventAvailableIcon,
        cardBg: '#EEF4FF', // Light Indigo/Periwinkle
        iconBg: '#E0EAFF',
        iconColor: '#444CE7', // Indigo
    },
    prescriptions: {
        icon: MedicationIcon,
        cardBg: '#ECFDF3', // Light Green/Teal
        iconBg: '#D1FADF',
        iconColor: '#039855', // Green
    },
    default: {
        icon: PeopleIcon,
        cardBg: '#F2F4F7',
        iconBg: '#E4E7EC',
        iconColor: '#344054',
    },
};

interface StatCardProps {
    label: string;
    value: number;
    trend: number;
    trendLabel: string;
    icon: 'patients' | 'doctors' | 'reviews' | 'consultations' | 'prescriptions' | 'default';
    loading?: boolean;
}

export const StatCard = ({ label, value, trend, trendLabel, icon, loading }: StatCardProps) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const config = STAT_CONFIG[icon] || STAT_CONFIG.default;
    const IconComponent = config.icon;

    if (loading) {
        return (
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', height: '100%' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="circular" width={40} height={40} />
                </Stack>
                <Skeleton variant="rectangular" height={40} width="40%" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" />
            </Paper>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                bgcolor: isDark ? 'background.paper' : config.cardBg,
                border: isDark ? '1px solid #333' : 'none',
                borderRadius: 3,
                height: '100%',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-2px)'
                }
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {label}
                </Typography>
                <Box sx={{
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : config.iconBg,
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <IconComponent sx={{ color: isDark ? 'inherit' : config.iconColor, fontSize: 22 }} />
                </Box>
            </Stack>

            <Typography variant="h4" fontWeight={700} sx={{ mb: 1, color: isDark ? 'text.primary' : '#101828' }}>
                {value.toLocaleString()}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: trend >= 0 ? palette.status.verified.text : palette.chart.red }}>
                    {trend >= 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                    <Typography variant="caption" fontWeight={600}>
                        {Math.abs(trend * 100).toFixed(2)}%
                    </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                    {trendLabel}
                </Typography>
            </Stack>
        </Paper>
    );
};
