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
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <TopBar onMobileToggle={handleDrawerToggle} />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, md: 3 },
                        mt: 8,
                        overflowX: 'hidden'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
