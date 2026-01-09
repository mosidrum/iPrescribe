import { useState } from 'react';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { TopBar } from "./Topbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
            <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

            <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                minWidth: 0,
                width: { xs: '100%', md: 'calc(100% - 280px)' }
            }}>
                <TopBar onMobileToggle={handleDrawerToggle} />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, md: 3 },
                        mt: 8,
                        overflowX: 'hidden',
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
