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
    Chip
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { RecentPatient } from '../../types';

interface RecentPatientsProps {
    data: RecentPatient[] | undefined;
    isLoading: boolean;
}

export const RecentPatients = ({ data, isLoading }: RecentPatientsProps) => {
    return (
        <Paper elevation={0} sx={{ p: 0, borderRadius: 3, border: '1px solid #EAECF0', overflow: 'hidden' }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAECF0' }}>
                <Typography variant="h6" fontWeight={600}>
                    Recent Patients Sign Up
                </Typography>
                <Button
                    endIcon={<ArrowForwardIosIcon sx={{ fontSize: '12px !important' }} />}
                    sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 500 }}
                >
                    See All
                </Button>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 1000 }}>
                    <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>#</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Sign Up Date</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Patient Name</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Email Address</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Phone Number</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Last Seen Date & T</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Location</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Device</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            [1, 2, 3, 4, 5].map((i) => (
                                <TableRow key={i}>
                                    <TableCell colSpan={9} sx={{ py: 3, textAlign: 'center', color: 'text.secondary' }}>Loading...</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            data?.map((row, index) => (
                                <TableRow key={row.id} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.signUpDate}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={500}>{row.name}</Typography>
                                    </TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.lastSeen}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.device}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            size="small"
                                            sx={{
                                                bgcolor: '#ECFDF3',
                                                color: '#027A48',
                                                fontWeight: 500,
                                                borderRadius: '6px'
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}

                        {!isLoading && (!data || data.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={9} sx={{ textAlign: 'center', py: 5 }}>
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
