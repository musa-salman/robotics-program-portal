import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Custom hook that returns the authentication context.
 * @returns The authentication context.
 */
export const useAuth = () => useContext(AuthContext);
