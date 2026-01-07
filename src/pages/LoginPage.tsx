import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    InputAdornment,
    IconButton,
    Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuthStore } from '../store/useAuthStore';
import { Logo } from '../components/common/Logo';
import { Navbar } from '../components/landing/Navbar';

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const onSubmit = async (data: LoginFormInputs) => {
        setSubmitError('');
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            login(data.email);
            navigate('/dashboard');
        } catch (err) {
            setSubmitError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box
                sx={{
                    flex: 1,
                    bgcolor: '#1C2B5C', // Dark blue background
                    backgroundImage: 'linear-gradient(rgba(28, 43, 92, 0.95), rgba(28, 43, 92, 0.95)), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 6 },
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <Box sx={{ mb: 4 }}>
                            <Logo />
                        </Box>

                        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                            Login to iPrescribe Admin
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Provide the required details to login
                        </Typography>

                        {submitError && (
                            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                                {submitError}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
                            <Typography variant="body2" align="left" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
                                Email Address
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="e.g admin@careoneclinics.com"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                margin="normal"
                                sx={{ mt: 0, mb: 3 }}
                                disabled={loading}
                                {...register('email', {
                                    required: 'Email address is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />

                            <Typography variant="body2" align="left" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
                                Password
                            </Typography>
                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••••••••"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                margin="normal"
                                sx={{ mt: 0, mb: 1 }}
                                disabled={loading}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                                <Button
                                    variant="text"
                                    color="inherit"
                                    size="small"
                                    sx={{
                                        textTransform: 'none',
                                        color: 'text.secondary',
                                        fontWeight: 500
                                    }}
                                >
                                    Forgot password?
                                </Button>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    borderRadius: 2
                                }}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default LoginPage;
