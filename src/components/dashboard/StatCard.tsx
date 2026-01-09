import { Paper, Typography, Box, Stack, Skeleton, useTheme } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MedicationIcon from '@mui/icons-material/Medication';
import { palette } from '../../theme/theme';
import cardIcon from '../../assets/card-icon.png';

const STAT_CONFIG = {
    patients: {
        cardBg: '#F9F5FF',
        iconBg: '#F4EBFF',
        iconColor: '#7F56D9',
        useCardIcon: true,
        icon: null,
    },
    doctors: {
        cardBg: '#EFF8FF',
        iconBg: '#D1E9FF',
        iconColor: '#2E90FA',
        useCardIcon: true,
        icon: null,
    },
    reviews: {
        cardBg: '#FFFAEB',
        iconBg: '#FEF0C7',
        iconColor: '#F79009',
        useCardIcon: true,
        icon: null,
    },
    consultations: {
        cardBg: '#EEF4FF',
        iconBg: '#E0EAFF',
        iconColor: '#444CE7',
        useCardIcon: true,
        icon: null,
    },
    prescriptions: {
        cardBg: '#ECFDF3',
        iconBg: '#D1FADF',
        iconColor: '#039855',
        useCardIcon: false,
        icon: MedicationIcon,
    },
    default: {
        cardBg: '#F2F4F7',
        iconBg: '#E4E7EC',
        iconColor: '#344054',
        useCardIcon: true,
        icon: null,
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
    const isNegative = trend < 0;

    if (loading) {
        return (
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', height: '100%', border: `1px solid ${isDark ? '#333' : palette.ui.dividerLight}` }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="circular" width={40} height={40} />
                </Stack>
                <Skeleton variant="rectangular" height={32} width="40%" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" />
            </Paper>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                bgcolor: isDark ? 'background.paper' : config.cardBg,
                border: isDark ? `1px solid #333` : 'none',
                borderRadius: 3,
                height: '100%',
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ fontSize: '0.875rem' }}>
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
                    {config.useCardIcon ? (
                        <img 
                            src={cardIcon} 
                            alt="card icon" 
                            style={{ 
                                width: 20, 
                                height: 20,
                                filter: isDark ? 'none' : `brightness(0) saturate(100%) ${getIconFilter(config.iconColor)}`
                            }} 
                        />
                    ) : (
                        config.icon && <config.icon sx={{ color: isDark ? 'inherit' : config.iconColor, fontSize: 20 }} />
                    )}
                </Box>
            </Stack>

            <Typography variant="h4" fontWeight={700} sx={{ mb: 1.5, color: 'text.primary', fontSize: '2rem' }}>
                {value.toLocaleString()}
            </Typography>

            <Stack direction="row" spacing={0.5} alignItems="center">
                <Stack direction="row" alignItems="center" spacing={0.25} sx={{ color: isNegative ? palette.chart.red : palette.status.verified.text }}>
                    {isNegative ? <ArrowDownwardIcon sx={{ fontSize: 16 }} /> : <ArrowUpwardIcon sx={{ fontSize: 16 }} />}
                    <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                        {Math.abs(trend * 100).toFixed(2)}%
                    </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    {trendLabel}
                </Typography>
            </Stack>
        </Paper>
    );
};

// Helper function to convert hex color to CSS filter for SVG coloring
const getIconFilter = (hexColor: string) => {
    // This is a simplified approach - for production, you might want to use a more robust color conversion
    const colorMap: { [key: string]: string } = {
        '#7F56D9': 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(246deg) brightness(104%) contrast(97%)',
        '#2E90FA': 'invert(64%) sepia(88%) saturate(2298%) hue-rotate(200deg) brightness(103%) contrast(98%)',
        '#F79009': 'invert(75%) sepia(69%) saturate(1919%) hue-rotate(8deg) brightness(101%) contrast(96%)',
        '#444CE7': 'invert(35%) sepia(99%) saturate(1798%) hue-rotate(229deg) brightness(94%) contrast(86%)',
        '#039855': 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(146deg) brightness(95%) contrast(94%)',
        '#344054': 'invert(25%) sepia(16%) saturate(1064%) hue-rotate(187deg) brightness(94%) contrast(89%)',
    };
    return colorMap[hexColor] || 'none';
};
