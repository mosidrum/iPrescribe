import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    email: string;
    name: string;
    role: 'admin' | 'user';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (email: string) => set({
                user: { email, name: 'Admin User', role: 'admin' },
                isAuthenticated: true
            }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
