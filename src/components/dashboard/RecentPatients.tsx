import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Button,
    Chip,
    useTheme
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { RecentPatient } from '../../types';
import { useDashboardStore } from '../../store/useDashboardStore';
import { palette } from '../../theme/theme';

interface RecentPatientsProps {
    data: RecentPatient[] | undefined;
    isLoading: boolean;
}

export const RecentPatients = ({ data, isLoading }: RecentPatientsProps) => {
    const theme = useTheme();
    const { limit, setLimit } = useDashboardStore();
    const isDark = theme.palette.mode === 'dark';

    const handleSeeAll = () => {
        setLimit(50);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 0,
                borderRadius: 3,
                border: `1px solid ${isDark ? '#333' : palette.ui.dividerLight}`,
                overflow: 'hidden',
                bgcolor: 'background.paper'
            }}
        >
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${isDark ? '#333' : palette.ui.dividerLight}` }}>
                <Typography variant="h6" fontWeight={600} sx={{ fontFamily: 'Montserrat', fontSize: '1.125rem' }}>
                    Recent Patients Sign Up
                </Typography>
                {limit < 50 && (
                    <Button
                        onClick={handleSeeAll}
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: '12px !important' }} />}
                        sx={{
                            textTransform: 'none',
                            color: 'text.secondary',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            p: 0,
                            minWidth: 'auto',
                            '&:hover': {
                                boxShadow: 'none',
                                bgcolor: 'transparent',
                            }
                        }}
                    >
                        See All
                    </Button>
                )}
            </Box>

            <TableContainer sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 900 }}>
                    <TableHead sx={{ bgcolor: isDark ? '#1F2937' : '#F9FAFB' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem', py: 2 }}>#</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem', py: 2 }}>Sign Up Date</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem', py: 2 }}>Patient Name</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem', py: 2 }}>Email Address</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem', py: 2 }}>Phone Number</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem', py: 2 }}>Last Seen Date & T</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem', py: 2 }}>Location</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem', py: 2 }}>Device</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem', py: 2 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            [1, 2, 3, 4, 5].map((i) => (
                                <TableRow key={i}>
                                    <TableCell colSpan={9} sx={{ py: 2.5, textAlign: 'center', color: 'text.secondary', fontSize: '0.8rem' }}>Loading...</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            data?.map((row, index) => (
                                <TableRow key={row.id} hover>
                                    <TableCell sx={{ fontSize: '0.875rem', py: 2.5 }}>{index + 1}</TableCell>
                                    <TableCell sx={{ fontSize: '0.875rem', py: 2.5 }}>{row.signUpDate}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.875rem' }}>{row.name}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.875rem', py: 2.5 }}>{row.email}</TableCell>
                                    <TableCell sx={{ fontSize: '0.875rem', py: 2.5 }}>{row.phone}</TableCell>
                                    <TableCell sx={{ fontSize: '0.875rem', py: 2.5 }}>{row.lastSeen}</TableCell>
                                    <TableCell sx={{ fontSize: '0.875rem', py: 2.5 }}>{row.location}</TableCell>
                                    <TableCell sx={{ fontSize: '0.875rem', py: 2.5 }}>{row.device}</TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Chip
                                            label={row.status}
                                            size="small"
                                            sx={{
                                                bgcolor: row.status === 'Verified' ? (isDark ? palette.status.verified.bgDark : palette.status.verified.bg) : palette.status.pending.bg,
                                                color: row.status === 'Verified' ? (isDark ? palette.status.verified.textDark : palette.status.verified.text) : palette.status.pending.text,
                                                fontWeight: 500,
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                height: 24
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}

                        {!isLoading && (!data || data.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={9} sx={{ textAlign: 'center', py: 4, fontSize: '0.8rem' }}>
                                    No patients found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
