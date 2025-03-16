import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

//Register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData,{
        headers:{ 'Content-Type': 'multipart/form-data'},
    });
    return response.data;
    } catch (error) {
        return error.response.data || {error : 'Registration failed'};
    }
};

//Login user
export const LoginUser = async (Credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, Credentials);
        return response.data;
    } catch (error) {
        return error.response.data || {error : 'Login failed'};
    };
}