import type { ReactNode } from 'react';
import { Box, Drawer, CssBaseline } from '@mui/material';
import { SidebarContent } from './SidebarContent';
import { Topbar } from './Topbar';
import { useUIStore } from '../../store/useStore';

const DRAWER_WIDTH = 280;

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const { sidebarOpen, closeSidebar } = useUIStore();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Topbar />

            <Box
                component="nav"
                sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={sidebarOpen}
                    onClose={closeSidebar}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                    }}
                >
                    <SidebarContent />
                </Drawer>

                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH,
                            borderRight: '1px solid #E6E8F0'
                        },
                    }}
                    open
                >
                    <SidebarContent />
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
                    mt: 8,
                    bgcolor: '#FAFAFA',
                    minHeight: '100vh'
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
