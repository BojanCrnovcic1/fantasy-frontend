import { createContext, useContext } from 'react';
import type { Users } from '../types/Users';

export interface AuthContextType {
    user: Users | null;
    setUser: (user: Users | null) => void;
    accessToken: string | null;
    refreshToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    getUserProfile: (token: string) => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
