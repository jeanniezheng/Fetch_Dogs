import axios from 'axios';
import { API_BASE_URL } from '../../../config';

export const handleLogin = async (
    name,
    email,
    setUser,
    setIsAuthenticated
) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/login`,
            { name, email },
            { withCredentials: true }
        );

        setUser({ name, email });
        setIsAuthenticated(true);
    } catch (error) {
        console.error('Failed to login:', error);
    }
};
