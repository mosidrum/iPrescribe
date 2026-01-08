import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Sidebar } from './Sidebar';
import { TopBar } from "./Topbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {!isMobile && <Sidebar />}

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <TopBar />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        mt: 8,
                        ml: { md: '280px' },
                        overflowX: 'hidden'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
