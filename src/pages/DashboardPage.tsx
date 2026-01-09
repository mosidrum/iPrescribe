import { useState } from 'react';
import { Grid, Box, Typography, Button, Stack, Menu, MenuItem } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { ChartWidget } from '../components/dashboard/Charts';
import { RecentPatients } from '../components/dashboard/RecentPatients';
import { useDashboardData } from '../hooks/useDashboardData';
import { useDashboardStore } from '../store/useDashboardStore';
import { palette } from '../theme/theme';

const DashboardPage = () => {
    const { dateRange, setDateRange } = useDashboardStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Use TanStack React Query for data fetching
    const { data, isLoading, error, refetch } = useDashboardData();

    const handleDateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDateClose = (newRange?: string) => {
        if (newRange) {
            setDateRange(newRange);
            // Refetch data when date range changes
            refetch();
        }
        setAnchorEl(null);
    };

    // Handle error state
    if (error) {
        return (
            <DashboardLayout>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    minHeight: '400px',
                    textAlign: 'center'
                }}>
                    <Typography variant="h6" color="error" gutterBottom>
                        Failed to load dashboard data
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        There was an error connecting to the iPrescribe API. Please try again.
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => refetch()}
                        sx={{ bgcolor: palette.ui.buttonBg }}
                    >
                        Retry
                    </Button>
                </Box>
            </DashboardLayout>
        );
    }

    const stats = data?.stats || [];

    return (
        <DashboardLayout>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, md: 3 } }}>

                {/* Header Section */}
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ fontSize: '1.25rem' }}>
                            Dashboard
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            Latest update for the last 7 days. check now
                        </Typography>
                    </Box>

                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Button
                            variant="outlined"
                            disableRipple
                            startIcon={<CalendarTodayIcon sx={{ fontSize: '16px !important' }} />}
                            endIcon={<KeyboardArrowDownIcon />}
                            onClick={handleDateClick}
                            sx={{
                                borderRadius: '8px',
                                borderColor: 'divider',
                                color: 'text.primary',
                                textTransform: 'none',
                                py: 0.875,
                                px: 1.5,
                                bgcolor: 'background.paper',
                                whiteSpace: 'nowrap',
                                fontSize: '0.8rem',
                                '&:hover': {
                                    bgcolor: 'background.paper',
                                    borderColor: 'text.secondary',
                                    boxShadow: 'none',
                                }
                            }}
                        >
                            {dateRange}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => handleDateClose()}
                        >
                            <MenuItem onClick={() => handleDateClose('12th Sept - 15th Sept, 2025')} disableRipple>Last 7 Days</MenuItem>
                            <MenuItem onClick={() => handleDateClose('1st Sept - 30th Sept, 2025')} disableRipple>Last 30 Days</MenuItem>
                            <MenuItem onClick={() => handleDateClose('1st Jan - 31st Dec, 2025')} disableRipple>This Year</MenuItem>
                        </Menu>

                        <Button
                            variant="contained"
                            disableRipple
                            sx={{
                                bgcolor: palette.ui.buttonBg,
                                borderRadius: '8px',
                                textTransform: 'none',
                                py: 0.875,
                                px: 2.5,
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '&:hover': {
                                    bgcolor: palette.primary.dark,
                                    boxShadow: 'none',
                                }
                            }}
                        >
                            Export
                        </Button>
                    </Stack>
                </Stack>

                <Grid container spacing={{ xs: 2.5, md: 3 }}>
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

                <Grid container spacing={{ xs: 2.5, md: 3 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ChartWidget
                            title="Consultation Over Time"
                            type="line"
                            data={data?.consultationTrend || []}
                            color={palette.chart.blue}
                            label="Consultations"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ChartWidget
                            title="Prescription Volume Trend"
                            type="line"
                            data={data?.prescriptionTrend || []}
                            color={palette.chart.green}
                            label="Prescriptions"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={{ xs: 2.5, md: 3 }}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <ChartWidget
                            title="Active Doctors vs Active Patients"
                            type="bar"
                            data={data?.doctorVsPatient || []}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <ChartWidget
                            title="Top Specialties in Demand"
                            type="donut"
                            data={data?.specialties || []}
                            legend={true}
                        />
                    </Grid>
                </Grid>

                <RecentPatients
                    data={data?.recentPatients}
                    isLoading={isLoading}
                />

            </Box>
        </DashboardLayout>
    );
};

export default DashboardPage;
